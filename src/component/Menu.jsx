import axios from "axios"
import { useState, useEffect } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function Menu() {

  const [data, setData] = useState([])
  function cntapi() {
    axios.get("http://localhost:3000/menucard")
      .then(response => {
        let ar = response.data.menu
        setData(ar)
        console.log(ar)
      })
  }
  useEffect(() => { //onload()
    cntapi();

  }, [])

  return (
    <>
      <center>
        <div className="mt-4 p-5 text-white rounded" data-aos="fade-up" data-aos-delay="250">
          <div className="container section-title">
            <p><span>Menu</span></p>
          </div>
          <table className="table table-secondary" style={{ width: '80%', fontSize: '18  px' }}>
            <thead >
              <tr className="table-dark">
                {/* <th scope="col">MENU ID</th> */}
                <th scope="col">MENU NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              {data.map((result) => {
                return (
                  <tr key={result.mid}>

                    {/* <td>{result.mid}</td> */}
                    <td>{result.mname}</td>
                    <td>{result.price}</td>
                    <td>{result.category}</td>
                    <td>{result.size}</td>
                  </tr>)
              })}

            </tbody>
          </table>
        </div>


      </center>
    </>
  )
}