import dayjs from 'dayjs'

export default tag Clock
	def mount
		setInterval(render.bind(this), 1000)

	<self.clock>
		dayjs().format('hh:mm:ss')

css .clock
	d: flex
	h: 100%
	margin: auto
	ai: center
	jc: center
	fs: 90px
	ff: sans
