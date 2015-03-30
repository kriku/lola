/** @jsx React.DOM */
// 
// In this example we also have two components - a picture and
// a picture list. The pictures are fetched from Facebook via AJAX.

var Picture = React.createClass({displayName: "Picture",
	// This component doesn't hold any state - it simply transforms
	// whatever was passed as attributes into HTML that represents a picture.
	clickHandler: function () {
		// When the component is clicked, trigger the onClick handler that 
		// was passed as an attribute when it was constructed:
		this.props.onClick(this.props.reference);
	},
	render: function () {
		var cls = 'picture ' + (this.props.favorite ? 'favorite' : '');
		return (
			React.createElement("div", {className: cls, onClick: this.clickHandler}, 
				React.createElement("img", {src: this.props.src})
			)
		);
	}
});

var PictureList = React.createClass({displayName: "PictureList",
	getInitialState: function () {
		// The pictures array will be populated via AJAX, and 
		// the favorites one when the user clicks on an image:
		return { pictures: [], favorites: [] };
	},
	getPhotos: function (albums) {
		var result = [];
		if (albums.data) {
			var i, len = albums.data.length, j, lenAlbum;
			for (i=0; i<len; i++) {
				if (albums.data[i].photos) {
					lenAlbum = albums.data[i].photos.data.length;
					for (j=0; j<lenAlbum; j++) {
						result.push({
							id: albums.data[i].photos.data[j].id,
							src: albums.data[i].photos.data[j].source,
							url: albums.data[i].photos.data[j].link,
							favorite: false
						});
					}
				}
			}
		}
		return result;
	},

	componentDidMount: function () {
		// When the component loads, send a jQuery AJAX request
		var self = this;
		// API endpoint for facebook accounts photos
		var baseApiUrl = 'http://graph.facebook.com/DetamSLubovu';
		var albumsQuery = '?fields=albums{photos}'
		var url = baseApiUrl + albumsQuery;
		var ajax = Ajax();
		ajax.open('GET', url, true);
		ajax.setRequestHeader('Content-type', 'json');
		ajax.send();
		ajax.onreadystatechange = function () {
			if(ajax.readyState==4 && ajax.status==200){
				var result = JSON.parse(ajax.responseText);
				var pictures = self.getPhotos(result.albums);
				// Update the component's state. This will trigger a render.
				// Note that this only updates the pictures property, and does
				// not remove the favorites array.
				self.setState({ pictures: pictures });
			}
		};
	},

	pictureClick: function (id) {
		console.log(id);
		// id holds the ID of the picture that was clicked.
		// Find it in the pictures array, and add it to the favorites
		var favorites = this.state.favorites,
				pictures = this.state.pictures;
		for (var i = 0; i < pictures.length; i++) {
			// Find the id in the pictures array
			if (pictures[i].id == id) {
				if (pictures[i].favorite) {
					return this.favoriteClick(id);
				}
				// Add the picture to the favorites array,
				// and mark it as a favorite:
				favorites.push(pictures[i]);
				pictures[i].favorite = true;
				break;
			}
		}
		// Update the state and trigger a render
		this.setState({pictures: pictures, favorites: favorites});
	},

	favoriteClick: function (id) {
		console.log(id);
		// Find the picture in the favorites array and remove it. After this, 
		// find the picture in the pictures array and mark it as a non-favorite.
		var favorites = this.state.favorites,
			pictures = this.state.pictures;
		for (var i = 0; i < favorites.length; i++) {
			if (favorites[i].id == id) break;
		}
		// Remove the picture from favorites array
		favorites.splice(i, 1);
		for (i = 0; i < pictures.length; i++) {
			if(pictures[i].id == id) {
				pictures[i].favorite = false;
				break;
			}
		}
		// Update the state and trigger a render
		this.setState({pictures: pictures, favorites: favorites});
	},

	render: function () {
		var self = this;
		var pictures = this.state.pictures.map(function (p) {
			return React.createElement(Picture, {reference: p.id, src: p.src, favorite: p.favorite, onClick: self.pictureClick})
		});
		if(!pictures.length){
			pictures = React.createElement("p", null, "Loading images..");
		}
		var favorites = this.state.favorites.map(function(p){
			return React.createElement(Picture, {reference: p.id, src: p.src, favorite: true, onClick: self.favoriteClick})
		});
		if(!favorites.length){
			favorites = React.createElement("p", null, "Click an image to mark it as a favorite.");
		}
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "DetamSLubovu Facebook Pics"), 
				React.createElement("div", {className: "pictures"}, " ", pictures, " "), 
				React.createElement("h1", null, "Your favorites"), 
				React.createElement("div", {className: "favorites"}, " ", favorites, " ")
			)
		);
	}
});

React.render(
	React.createElement(PictureList, null),
	document.getElementById('example4')
);