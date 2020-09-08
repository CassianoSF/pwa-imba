import dayjs from 'dayjs'

export default tag Clock
	def mount
		install_prompt = false
		render()
		window.onbeforeinstallprompt = do |e|
			e.preventDefault()
			install_prompt = true
			render()
			deferred_prompt = e
		setInterval(render.bind(this), 1000)

	def install
		deferred_prompt.prompt()
		choiceResult = await deferred_prompt.userChoice
		if (choiceResult.outcome === 'accepted')
			install_prompt = false
			render()

	<self>
		if install_prompt
			<.container>
				<button :gotpointercapture.install [h: 8vh m: auto w: 50vw fs: lg]> "Instalar"
		<.clock>
			dayjs().format('hh:mm:ss')

	css .clock
		d: flex
		h: 100%
		margin: auto
		ai: center
		jc: center
		fs: 60px
		ff: sans

	css .container
		d: flex
		rd: md
		ta: center

