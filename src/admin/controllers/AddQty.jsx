import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function AddQty() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [qt, setqty] = useState("");

  const [eqid, editeqid] = useState("");
  const [eqt, editeqty] = useState("");
 

  //Add Handle open/close
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  //Update Handle open/close
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // Handle1 input change
  const getqty = (e) => {
    setqty(e.target.value);
  };

 // Handle2 input change
  const geteqty = (e) => {
    editeqty(e.target.value);
  };

   const geteqid = (e) => {
    editeqid(e.target.value);
  };


  // Handle form submission
  const handleSubmit1 = (e) => {
    e.preventDefault();
    const ad = {
      size: qt
    }
    axios.post("http://localhost:3000/addqty", ad)
      .then(response => {
        if (response.data.status == 201) {
          alert("Add Successfully")
        }
        else {
          alert("Add Failed")
        }

      })

    handleClose1(); // Close the dialog after submission
   };

   const handleSubmit2=(e)=>{
        e.preventDefault();

        const eqty = {
            qid:eqid,
            size:eqt
        }
        axios.put("http://localhost:3000/updateqty",eqty)
            .then(response => {
                if (response.data.status == 201) {
                    alert("Update successfully")
                    cntapi()
                }
                else{
                    alert("Update failed")
                }
            });
    handleClose2(); // Close the dialog after submission
  };

  function delqty(id) {
    const del = {
      qid: id
    }
    axios.delete("http://localhost:3000/delqtyByQid", { data: del })
      .then(response => {
        if (response.data.status == 200) {
          alert("Delete successfully")
        }
        else {
          alert("Delete Failed");
        }

      })

  }



  const [data, setdata] = useState([])
  function cntapi(){

    axios.get("http://localhost:3000/qty")
      .then(response => {
        let arr = response.data.qty_mast;
        setdata(arr)
        console.log(arr)
     })
  }

      useEffect(() => { //onload()
    cntapi();
  }, [])//  


  return (
    <>
      {/* Add Dialog */}
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Size Master</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Size"
            name="name"
            onChange={getqty}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit1} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Update Food Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="QTY ID"
            value={eqid}
            disabled
          />
          <TextField
            fullWidth
            margin="dense"
            label="Quantity"
            name="category"
            value={eqt}
            onChange={geteqty}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit2} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <center>
        <Button variant="success" onClick={handleOpen1}>Add Quantity</Button>
        <div className="mt-4 p-5  text-white rounded">
          <table className="table table-secondary" style={{ width: '100%', fontSize: '18px' }}>
            <thead>
              <tr className="table-dark">
                <th scope="col">QID</th>
                <th scope="col">Size</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {data.map((result) => {
                return (
                  <tr key={result.qid}>

                    <td>{result.qid}</td>
                    <td>{result.size}</td>
                    <td>
                      <Button variant="warning"
                                     onClick={() => {
                                     handleOpen2();
                                     editeqid(result.qid);
                                     editeqty(result.size);  
                                     }}>Update</Button>
                      <Button variant="danger" onClick={() => delqty(result.qid)}>Delete</Button>
                    </td>
                  </tr>)
              })}

            </tbody>
          </table>
        </div>
      </center>
    </>
  )
}