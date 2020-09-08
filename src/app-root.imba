import {Router} from './router/router'

import Clock     from './views/Clock'
import Geo       from './views/Geo'
import Bluetooth from './views/Bluetooth'

Router.new.go('/clock')

tag App
	def render
		<self>
			<.header>
				window.location.pathname.slice(1)
			<.content>
				<Clock route.exact='/clock'>
				<Geo route.exact='/geo'>
				<Bluetooth route.exact='/bluetooth'>
			<.nav>
				<i .nav-item  route-to='/clock'> 
					<span .fa .fa-clock .fa-2x>
					"Clock"
				<i .nav-item  route-to='/geo'> 
					<span .fa .fa-map-marker-alt .fa-2x>
					"Geo"
				<i .nav-item  route-to='/bluetooth'> 
					<span .fa .fa-bluetooth .fa-2x>
					"Bluetooth"


	css .header
		h: 10vh bgc: black
		d: flex margin: auto 
		ai: center jc: center 
		bdb: 1px solid #444
		c: white ff: sans
		tt: uppercase
		fw: bold

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

global css body
	m: 0

imba.mount <App>
