import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function AddFoodCat() {

     //first Dialog input(hooks)
    const [mn, setcat] = useState("");

    //secound Dialog input(hooks)
    const [efid, editfid] = useState("");
    const [ecat, editcat] = useState("");
    

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    // Handle open1/close1
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    // Handle open2/close2
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

   
    function getcat(n) {
        setcat(n.target.value)
    }
    function getecat(n) {
       editcat(n.target.value)
    }

    const handleSubmit1 = (e) => {
        e.preventDefault();
        // alert(mn)
        const ct = {
            category: mn
        }
        axios.post("http://localhost:3000/addfoodcat", ct)
            .then(response => {
                if (response.data.status == 201) {
                    alert("Add successfully")
                }
                else{
                    alert("Add failed")
                }
            })
        handleClose1(); //close popup after submit
    };

 
      const handleSubmit2 = (e) => {
        e.preventDefault();
    
        const ect = {
            fid:efid,
            category:ecat
        }
        axios.put("http://localhost:3000/updatefoodcat",ect)
            .then(response => {
                if (response.data.status == 201) {
                    alert("Update successfully")
                    cntapi()
                }
                else{
                    alert("Update failed")
                }
            });
        handleClose2(); //close popup after submit
    };

    function delcat(id) {
        const del = {
            fid:id
        }
        axios.delete("http://localhost:3000/delfoodByFid",{data:del})
            .then(response => {
            if (response.data.status==200) {
                    alert("Delete successfully")
                }
                else{
                    alert("Delete Failed");
                }

            })
    }

    const [data, setData] = useState([])
  function cntapi(){
    
    axios.get("http://localhost:3000/food")
      .then(response => {
        let ar = response.data.food
        setData(ar)
        console.log(ar)
      })
   }


     useEffect(() => { //onload()
    cntapi();
  }, [])//  


    return (
        <>
           {/* Add Dialog */}
            <Dialog open={open1} onClose={handleClose1}>
                <DialogTitle>Enter Food Category</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Food category"
                        name="category"
                        value={mn}
                        onChange={getcat}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit1} variant="contained" color="primary">
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
                     label="Food ID"
                     value={efid}
                     disabled
                     />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Food category"
                        name="category"
                        value={ecat}
                        onChange={getecat}
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
                <Button variant="success" onClick={handleOpen1} >Add Food Category</Button>
                <div className="mt-4 p-5  text-white rounded">
                    <table className="table table-secondary" style={{ width: '100%', fontSize: '18px' }}>
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">FID</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((result) => {
                                return (
                                <tr key={result.fid}>

                                    <td>{result.fid}</td>
                                    <td>{result.category}</td>
                                    <td>
                                    <Button variant="warning"
                                     onClick={() => {
                                     editfid(result.fid);
                                     editcat(result.category);
                                     handleOpen2();
                                     }}>Update</Button>
                                    <Button variant="danger" onClick={() => delcat(result.fid)} >Delete</Button>
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