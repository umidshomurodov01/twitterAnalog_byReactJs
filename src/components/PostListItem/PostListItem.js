import React from "react";
import './PostListItem.css'

export default class PostLIstItem extends React.Component{
  
  render(){
    const {label,deleteItem,onToggleImportant,onToggleLike,important,like} = this.props
    
    let classNames = "app-list-item d-flex justify-content-between"
    if(important){
      classNames += " important"
    }
    if(like){
      classNames += " like"

    }
    return(
<div className={classNames}>
      <span className="app-list-item-label" onClick={onToggleLike
      }>
        {label}
      </span>
      <div className="d-flex justify-content-center aligen-atems-center">
        <button type='button' className="btn-star btn-sm" onClick = {onToggleImportant}>
          <i className="fa fa-star"></i>
        </button>
        <button type='button' className="btn-trash btn-sm" onClick={deleteItem}>
          <i className="fa fa-trash"></i>
        </button>
        <i className="fa fa-heart"></i>
      </div>
    </div>
    )
  }
}
