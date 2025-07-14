import axios from "axios"
import { useState, useEffect } from "react"
import Crd from './Crd.jsx'
export default function Dashbrd() {

  const [data, setData] = useState([])
  function cntapi() {
    axios.get("http://localhost:3000/menucard")
      .then(response => {
        let ar = response.data.menu
        setData(ar)
      })
  }

  useEffect(() => { //onload()
    cntapi();
  }, [])//  

  return (
    <>
      <center>
        <Crd/>
        <div className="mt-4 p-5 text-white rounded">
          <table className="table table-secondary" style={{ width: '100%', fontSize: '18px' }}>
            <thead>
              <tr className="table-dark">
                <th scope="col">MENU ID</th>
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

                    <td>{result.mid}</td>
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