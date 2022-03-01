import PostListItem from "../PostListItem";
import './PostList.css';
const PostList = ({posts,deleteItem,onToggleImportant,onToggleLike}) => {
  const elements = posts.map((item) =>{
    const {id , ...ItemProps} = item
    return(
      <li key={id} className="list-group-item">
      <PostListItem 
      {...ItemProps} 
      deleteItem = { ()=>  deleteItem(id)}
      onToggleImportant = {() => onToggleImportant(id)}
      onToggleLike = {() => onToggleLike(id)}

      />
      </li>
    )
  })

  return(
    <ul className="app-list list-group-item">
      {elements}
    </ul>
  )
}
export default PostList;