import React from 'react';
import AppHeader from '../AppHeader';
import PostAddForm from '../PostAddForm';
import PostList from '../PostList';
import PostStatusFilter from '../PostStatusFilter';
import SearchPanel from '../SearchPanel';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term : '',
      filter : "all",
      data: [
        { label: "This was done in the React", important: false, like: true, id: 1 },
        { label: "My name is Jhon Doe", important: false, like: false, id: 2 },
        { label: "This is a Twitter analog ", important: true, like: false, id: 3 },
      ]
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLike = this.onToggleLike.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.addItem = this.addItem.bind(this);
    this.maxId = 4

  }
  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex(elem => elem.id === id)
      const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
      return {
        data: newArr
      }
    })
  }
  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      like : false,
      id: this.maxId++

    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    })

  }
  onToggleImportant(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const oldItem = data[index];
      const newItem = {...oldItem, important : !oldItem.important};
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

      return {
        data : newArr
      }

    })
  }
  onToggleLike(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const oldItem = data[index];
      const newItem = {...oldItem, like : !oldItem.like};
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

      return {
        data : newArr
      }

    })
  }
  searchPosts(items,term){
 if(term.length === 0){
  return items
 }
   return items.filter(item => {
   return item.label.indexOf(term) > -1
 })
  }

  onUpdateSearch(term){
    this.setState({term});
  }

  filterPost(items,filter){
    if(filter === "like"){
      return items.filter(item => item.like)
    } else{
      return items
    }
  }
  onFilterSelect(filter){
    this.setState({filter})
  }

  render() {
  const {data,term,filter} = this.state
  const liked = data.filter(item => item.like).length;
  const allPosts = data.length;
  const   visiblePosts = this.filterPost(this.searchPosts(data,term), filter);
    return (
      <div className='app'>
        <AppHeader liked = {liked} allPosts = {allPosts} />
        <div className='search-panel d-flex'>
          <SearchPanel onUpdateSearch ={this.onUpdateSearch} />
          <PostStatusFilter filter = {filter} onFilterSelect = {this.onFilterSelect}/>
        </div>
        <PostList
          posts={visiblePosts}
          deleteItem={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLike={this.onToggleLike}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    )
  }
}


