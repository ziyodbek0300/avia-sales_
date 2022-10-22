import React, {useEffect, useLayoutEffect, useState} from "react";
import _ from "lodash";
import moment from "moment";
import {getHtplace} from "../constants/htplace";
// import { useEffect,useState } from "react";

// export const compare = (a, b) => {
//   return +a.props.e.sortField > +b.props.e.sortField ? 1 : -1;
// };

const Sort = ({ children,hotels,setSearch }) => {
  // console.log(children);
  // const [data,setData] = useState([])
  // useEffect (() => {
  //   // setSearch(" ")
  //   // setTimeout(()=>{
  //   //   setSearch("")
  //   // },300)
  //   setData()
  // },[hotels,children])
  // return React.Children.toArray(children).sort(compare)
  // useEffect(()=>{
  //   setHotels( _.orderBy(children,[(e) => e?.props?.e?.sortField], ["asc"]))
  // },[])
  // console.log(children);
  return _.orderBy(
    React.Children.toArray(children),
    [(e) => e?.props?.price],
    ["asc"]
  );
};

// class Sort extends React.Component {
//   constructor() {
//     super()
//     // Bind the method to the component context
//     this.forceUpdate()
//     this.renderChildren = this.renderChildren.bind(this)
//   }

//   renderChildren() {
//     // TODO: Change the name prop of all children
//     // to this.props.name
//     console.log(this.props.children)
//     return _.orderBy(this.props.children,[(e) => e?.props?.e?.sortField], ["asc"])
//   }

//   render() {
//     return (
//       <div className="group">
//         {this.renderChildren()}
//       </div>
//     )
//   }
// }

export default Sort;
