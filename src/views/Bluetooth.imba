const SERVICE_UUID = 'ab0828b1-198e-4351-b779-901fa0e0371e'
const CHARACTERISTIC_UUID_RX = '4ac8a682-9736-4e5d-932b-e9b31405049c'
const CHARACTERISTIC_UUID_TX = '23bf1882-3af7-11ea-b77f-2e728ce88125'

export default tag Bluetooth
	def mount
		encoder = TextEncoder.new('utf-8')
		decoder = TextDecoder.new('utf-8')


	def connect
		let device = await window.navigator.bluetooth.requestDevice({
			acceptAllDevices: true
			optionalServices: [SERVICE_UUID]
		})

		let server = await device.gatt.connect()
		let service = await server.getPrimaryService(SERVICE_UUID)
		
		attr_notifier = await service.getCharacteristic(CHARACTERISTIC_UUID_TX)
		attr_writer = await service.getCharacteristic(CHARACTERISTIC_UUID_RX)
		ready = true

	def write
		return unless attr_writer
		attr_writer.writeValue(encoder.encode(value))

	def read
		return unless attr_notifier
		response = decoder.decode(await attr_notifier.readValue)
		console.log response

	<self>
		<button :gotpointercapture=(connect)> "Connect"