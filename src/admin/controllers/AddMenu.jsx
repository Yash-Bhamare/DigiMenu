import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
export default function Menu() {

  //first Dialog input(hooks)
  const [mnm, setMn] = useState("")
  const [prz, setPrz] = useState("") // we can use 0 also
  const [fid, setFid] = useState("") // we can use 0 also
  const [qid, setQid] = useState("") // we can use 0 also

  //secound Dialog input(hooks)
  const [emid, editMid] = useState(0)
  const [emnm, editMn] = useState("")
  const [eprz, editPrz] = useState(0)
  const [efid, editFid] = useState(0)
  const [eqid, editQid] = useState(0)


  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  // Handle open1/close1
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  // Handle open2/close2
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  function getmn(e) {
    setMn(e.target.value)

  }
  function getqid(e) {
    setQid(e.target.value)

  }
  function getprice(e) {
    setPrz(e.target.value)

  }
  function getfid(e) {
    setFid(e.target.value)
  }

  //
  function getemn(e) {
    editMn(e.target.value)

  }
  function geteqid(e) {
    editQid(e.target.value)

  }
  function geteprice(e) {
    editPrz(e.target.value)

  }
  function getefid(e) {
    editFid(e.target.value)
  }


  // Dialog Submit
  const handleSubmit1 = (e) => {
    e.preventDefault();
    //  alert(mnm+qid+prz+fid)
    // console.log(mnm+" "+prz+" "+fid+" "+qid)
    const dt = {
      mname: mnm,
      price: prz,
      fid: fid,
      qid: qid
    }
    axios.post("http://localhost:3000/addmenu", dt)
      .then(response => {
        if (response.data.status == 201) {
          alert(" Add success")
          cntapi();
        } else {
          alert("Add fail")
        }
      })
    handleClose1(); // Close the dialog after submission
  };

  // Dialog2 Submit
  const handleSubmit2 = (e) => {
    e.preventDefault();
    const edt = {
      mid: emid,
      mname: emnm,
      price: eprz,
      fid: efid,
      qid: eqid
    }
    axios.put("http://localhost:3000/updatemenu", edt)
      .then(response => {
        if (response.data.status == 201) {
          alert(" Update successfully")
          cntapi();
        } else {
          alert("Update Failed")
        }
      })
    handleClose2(); // Close the dialog after submission
  };

  const del = (id) => {
    const dt = {
      mid: id
    }
    axios.delete("http://localhost:3000/delmenuById", {
      data: dt
    })
      .then(response => {
        if (response.data.status == 200) {
          alert("Delete success")
          cntapi()
        }
      })
  }
  const [data, setData] = useState([])
  function cntapi() {
    axios.get("http://localhost:3000/menu")
      .then(response => {
        let ar = response.data.menu
        setData(ar)
      })
  }

  useEffect(() => { // onload()
    cntapi();
  }, [])  

  return (
    <>
      
      {/* Add Dialog */}
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Popup Form</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Menu Name"
            name="mname"
            value={mnm}
            onChange={getmn}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={prz}
            onChange={getprice}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Fid"
            name="fid"
            type="number"
            value={fid}
            onChange={getfid}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Qid"
            name="qid"
            type="number"
            value={qid}
            onChange={getqid}
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
        <DialogTitle>Popup Form</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Menu ID"
            name="mid"
            value={emid}
            disabled
          />
          <TextField
            fullWidth
            margin="dense"
            label="Menu Name"
            name="mname"
            value={emnm}
            onChange={getemn}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            name="price"
            value={eprz}
            onChange={geteprice}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Fid"
            name="fid"
            value={efid}
            onChange={getefid}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Qid"
            name="qid"
            value={eqid}
            onChange={geteqid}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit2} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <center>
        <Button variant="success" onClick={handleOpen1} >Add Menu</Button>
        <div className="mt-4 p-5 text-white rounded">
          <table className="table table-secondary" style={{ width: '100%', fontSize: '18px' }}>
            <thead>
              <tr className="table-dark " >
                <th scope="col">MENU ID</th>
                <th scope="col">MENU NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">FID</th>
                <th scope="col">QID</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((result) => {
                return (
                  <tr key={result.mid}>

                    <td>{result.mid}</td>
                    <td>{result.mname}</td>
                    <td>{result.price}</td>
                    <td>{result.fid}</td>
                    <td>{result.qid}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          editMid(result.mid);
                          editMn(result.mname);
                          editPrz(result.price);
                          editFid(result.fid);
                          editQid(result.qid);
                          handleOpen2(); // open dialog after setting values
                        }}>Update</Button>
                      <Button variant="danger" onClick={() => del(result.mid)}>Delete</Button>
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