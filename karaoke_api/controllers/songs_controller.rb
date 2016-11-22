class SongsController < ApplicationController

	get '/' do
		p 'session get router ---------------------------------'
		#session[:session_id]
		#session[:usernameeee] = 'jim'
		#p session




		binding.pry
		Song.all.to_json
	end

	get '/:id' do
		@id = params[:id]
		Song.find(@id).to_json
	end


	# get '/users/:id' do
	# 	binding.pry
	# 	@a = Account.all
	# 	@a = Account.find(1)
	# 	@a.songs
	# 	@a.songs.create(:title => 'meow', :artist => 'guster', :lyrics => 'meow meow meow')
	# 	 @Song.all
	# 	 Song.all
	# 	 @a.songs
	# 	 @a.songs.to_json 

	# end


	post '/' do
		p '-----------------------------------------'
		#p session
		#p session[:username]
		p '-----------------------------------------'
		# @id = params[:id]
		# @model = Account.find(@id)
		@title = params[:title]
		@artist = params[:artist]
		@lyrics = params[:lyrics]
		# @account_id = params[:account_id]

		@model = Song.new
		@model.title = @title
		@model.artist = @artist
		@model.lyrics = @lyrics
		# @model.account_id = @id
		@model.save

		@model.to_json
	end
	
	delete '/:id' do
		@id = params[:id]
		@model = Song.find(@id)
		@model.destroy

		{ :message => 'Song has been deleted.'}.to_json
	end


end
