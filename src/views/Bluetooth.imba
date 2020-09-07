const SERVICE_UUID = 'ab0828b1-198e-4351-b779-901fa0e0371e'
const CHARACTERISTIC_UUID = '4ac8a682-9736-4e5d-932b-e9b31405049c'

export default tag Bluetooth
	def mount
		encoder = TextEncoder.new()
		decoder = TextDecoder.new()
		button = "OFF"

		options = 
			video: 
				width: 
					min: 200
				height: 
					min: 300
				facingMode:  
					exact: "user" 
					# exact: "environment" 

		stream = await window.navigator.mediaDevices.getUserMedia(options)
		$video.srcObject = stream
		$video.play()

	def connect
		device = await window.navigator.bluetooth.requestDevice({
			acceptAllDevices: true
			optionalServices: [SERVICE_UUID]
		})
		# device.addEventListener('gattserverdisconnected', onDisconnected);

		server = await device.gatt.connect()
		service = await server.getPrimaryService(SERVICE_UUID)
		characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID)
		characteristic.startNotifications()
		characteristic.addEventListener('characteristicvaluechanged', onButtonChange.bind(this))

	def onButtonChange e
		let value = decoder.decode(e.target.value)
		if value == "ON" or value == "OFF"
			button = value
			render()
		
	def writeLed value
		return unless characteristic
		characteristic.writeValue(encoder.encode(value))

	<self>
		<section .container>
			<video$video .item >
		<section .container>
			<button .item :gotpointercapture.connect> "Connect"
		<section .container>
			<button .item :gotpointercapture.writeLed("red")> "Red"
			<button .item :gotpointercapture.writeLed("green")> "Green"
			<button .item :gotpointercapture.writeLed("blue")> "Blue"
		<section .container>
			if button == "ON"
				<button[c: white bg: green] .item disabled=true> "ON"
			if button == "OFF"
				<button[c: white bg: red] .item disabled=true> "OFF"
		
	css button
		h: 8vh

	css video
		max-width: 100vw
		max-height: 300px
		
	css .container
		max-width: 100vw
		d: flex m: 0 auto
		flex-flow: row wrap

	css .item 
		flex: 1
		margin: 5px
		text-align: center
		font-fs: 1.5em