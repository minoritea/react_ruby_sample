require 'sinatra'
require 'react_ruby'
require 'json'

$notes = ['Input comments...']

helpers do
	def load_script(filename)
		::IO.read(
			File.expand_path(
				File.join('../public/javascripts', filename),
				__FILE__))
	end

	def react(jsx)
		if ReactRuby.renderer.nil?
			ReactRuby.compile(
				jsx: load_script('view.jsx')
			)
		end
		ReactRuby.render(jsx)
  end
end

put '/api/notes' do
  $notes << params['note']
  $notes.to_json
end

get '/' do
  erb <<-ERB
    <html>
      <head>
			  <script src='/javascripts/vendor/react.js'></script>
			  <script src='/javascripts/vendor/JSXTransformer.js'></script>
			  <script src='/javascripts/vendor/vendor.js'></script>
				<script type='text/jsx' src='/javascripts/view.jsx'></script>
				<script type='text/jsx' src='/javascripts/app.jsx'></script>
      </head>
      <body>
			  <div id='notePad'>
					<%= react(%(<NotePad notes={#{$notes.to_json}}/>)) %>
				</div>
        <form action='#'>
          <input type='text' name='note'></input>
          <button type='submit'>Add</button>
        </form>
      </body>
    </html>
  ERB
end
