import Clock from './views/Clock'
import Geo from './views/Geo'
import Bluetooth from './views/Bluetooth'
import {Router} from './router/router'

tag App
	def render

		<self>
			<.header>
				<button> "Install"
			<.content>
				<Clock route.exact='/'>
				<Geo route.exact='/geo'>
				<Bluetooth route.exact='/bluetooth'>
			<.nav>
				<i .nav-item  route-to='/'> 
					<span .fa .fa-clock .fa-2x>
					"Clock"
				<i .nav-item  route-to='/geo'> 
					<span .fa .fa-map-marker-alt .fa-2x>
					"Geo"
				<i .nav-item  route-to='/bluetooth'> 
					<span .fa .fa-bluetooth .fa-2x>
					"Bluetooth"

global css body
	m: 0

global css button
	h: 40px c: white bgc:gray9 bc: red8 rd: md fs: md px: 30px
	bgc@active: gray7

css .header
	h: 10vh bgc: black
	d: flex margin: auto 
	ai: center jc: center 
	bdb: 1px solid #444

css .content
	bgc: black c:white h: 80vh p: 10px

css .nav
	bdt: 1px solid #444
	h: 10vh bgc: black c: white
	d: flex

css .nav-item
	d: grid
	ta: center
	margin: auto 
	ff: sans
	fs: xxs

imba.mount <App>
