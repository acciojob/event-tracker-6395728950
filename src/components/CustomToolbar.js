import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { All, Past, Upcoming } from './EventSlice'

const CustomToolbar = ({label,onNavigate}) => {
  const Dispatch   = useDispatch();
  return (
    <div style={styles.toolbar}>
    <button style={styles.navBtn} onClick={() => onNavigate("PREV")}>
      ⬅ Prev
    </button>
    <button style={styles.navBtn} onClick={() => onNavigate("NEXT")}>
      Next ➡
    </button>

    <h2 style={styles.label}>{moment(label, "MMMM D, YYYY").format("MMMM YYYY")}</h2>

    <button  style={styles.navBtn} onClick={()=>Dispatch(All())}>All</button>
     <button style={styles.past} onClick={()=>Dispatch(Past())}>Past</button>
     <button style={styles.upcoming} onClick={()=>Dispatch(Upcoming())}>Upcoming</button>

   
  </div>
  )
}

export default CustomToolbar
const styles = {
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      marginBottom: "10px",
    //   background: "#007bff",
      color: "white",
      borderRadius: "8px",
    },
    label: {
      margin: 0,
      color:"black"
    },
    navBtn: {
      background: "#007bff",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    past:{
      background:'rgb(222, 105, 135)',
      color:'white',
     
      border: "none",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    upcoming:{
     background:'rgb(140, 189, 76)',
     color:'white',
     border: "none",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    
    }
  };