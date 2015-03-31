/** @jsx React.DOM */
// Let's create a "real-time search" component
var SearchExample = React.createClass({displayName: "SearchExample",
  getInitialState: function(){
    return { searchString: '' };
  },
  handleChange: function(e){
    // If you comment out this line, the text box will not change its value.
    // This is because in React, an input cannot change independently of the value
    // that was assigned to it. In our case this is this.state.searchString.
    this.setState({searchString:e.target.value});
  },
  render: function() {
    var libraries = this.props.items,
      searchString = this.state.searchString.trim().toLowerCase();
    if (searchString.length > 0) {
      // We are searching. Filter the results.
      libraries = libraries.filter(function(l){
        return l.name.toLowerCase().match( searchString );
      });
    }
    return  React.createElement("div", null, 
              React.createElement("input", {type: "text", value: this.state.searchString, onChange: this.handleChange, placeholder: "Type here"}), 
              React.createElement("ul", null, 
                 libraries.map(function(l){
                  return React.createElement("li", null, l.name, " ", React.createElement("a", {href: l.url}, l.url))
                }) 
              )
            );
  }
});
var libraries = [
  { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
  { name: 'AngularJS', url: 'https://angularjs.org/'},
  { name: 'jQuery', url: 'http://jquery.com/'},
  { name: 'Prototype', url: 'http://www.prototypejs.org/'},
  { name: 'React', url: 'http://facebook.github.io/react/'},
  { name: 'Ember', url: 'http://emberjs.com/'},
  { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
  { name: 'Dojo', url: 'http://dojotoolkit.org/'},
  { name: 'Mootools', url: 'http://mootools.net/'},
  { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
  { name: 'Lodash', url: 'http://lodash.com/'},
  { name: 'Moment', url: 'http://momentjs.com/'},
  { name: 'Express', url: 'http://expressjs.com/'},
  { name: 'Koa', url: 'http://koajs.com/'},
];
// Render the SearchExample component on the page
React.render(
  React.createElement(SearchExample, {items:  libraries }),
  document.getElementById('example3')
);