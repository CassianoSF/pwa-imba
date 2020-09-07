import mapboxgl from 'mapbox-gl'


export default tag Geo
	def mount
		await window.navigator.permissions.query({name:'geolocation'})
		let geo = window.navigator.geolocation
		let options = {
			enableHighAccuracy: true
			timeout: 5000
			maximumAge: 0
		}
		mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fzc2lhbm9zZiIsImEiOiJja2VydjMydDgxZXhyMzRudGNidmZudXRyIn0.wjcZggyzs5QcZxhEL-L0zg'
		map = new mapboxgl.Map({
			container: $map
			style: 'mapbox://styles/mapbox/streets-v11'
			zoom: 14
		});
		map.on('load') do map.resize()
		marker = new mapboxgl.Marker()

		geo.getCurrentPosition(initPosition.bind(this))
		geo.watchPosition(setPosition.bind(this), onError.bind(this), options)


	def onError err
		console.warn err

	def setPosition pos
		marker.setLngLat([pos.coords.longitude, pos.coords.latitude]).addTo(map);

	def initPosition pos
		map.setCenter([pos.coords.longitude, pos.coords.latitude])

	<self>
		<div$map>

	css $map
		h: 100%