import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins, deleteAdmin } from "../../../redux/action/adminsActions";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";
import Crear from "./Crear";
import { Toast } from "../../../utils/Toast";
import { setearDataRenderAdmins } from "../../../utils/setearDataRenderColumns";

const Admins = ({ setShowCreateComponent, showCreateComponent }) => {
    const dispatch = useDispatch();
    const admins = useSelector((state) => state.admins.admins);
    var [copyAdmin, setCopyAdmin] = useState([]);
    const columns = ["Nombres y Apellidos","userName", "email","rol"];
    var [dataRender, setDataRender] = useState([]);
    var [valueSearch, setValueSearch] = useState("");
    var [refreshAdmins, setRefreshAdmins] = useState(null);
    const token = window.localStorage.getItem("dataUser");
    
  useEffect(() => {
    if (
        admins.length === 0 && 
        refreshAdmins === null) {
      dispatch(getAdmins(token));
      setRefreshAdmins(false);
    } 
    else {
      if (refreshAdmins === true) {
        dispatch(getAdmins(token));
        setRefreshAdmins(false);
      }else if(refreshAdmins === "search"){
        var adminNoFound=true;
        setShowCreateComponent(false)
        admins.map((admin) => {
          if(admin.userName.toLowerCase().includes(valueSearch.toLowerCase())){
            setCopyAdmin((data)=>[...data,admin])
            adminNoFound=false
          }
        })
        if(valueSearch!=="" && adminNoFound===true){
          Toast.fire({
            icon: "error",
            title: "Admin no encontrado",
          })
        }
        setRefreshAdmins(false);
      }
        setDataRender([]);
        if(copyAdmin.length>0){
          setearDataRenderAdmins(copyAdmin,setDataRender)
          setCopyAdmin([])
        }else{
          setearDataRenderAdmins(admins,setDataRender)
        }
    }
  }, [admins, refreshAdmins]);

  function activarEliminar(columnNameArray, idDelete) {
    if (columnNameArray === "Admin") {
      dispatch(deleteAdmin(idDelete,token))
        .then((data) => {
          setRefreshAdmins(true);
          Swal.fire("Deleted!", "El Admin se elimino con exito.", "success");
        })
        .catch((error) => {
          Swal.fire("Error!", "Algo salio mal.", "error");
        });
    }
  }

  return (
    <div className="flex flex-row">
      <div>
        <Aside 
          setShowCreateComponent={setShowCreateComponent}
          setRefresh={setRefreshAdmins} 
          setValueSearch={setValueSearch} 
        />
      </div>
      <div>
        {dataRender.length > 0 && showCreateComponent === false && (
          <Table
            setRefresh={setRefreshAdmins}
            dataRender={dataRender}
            columnsRender={columns}
            activarEliminar={activarEliminar}
          />
        )}
        {dataRender.length < 1 && showCreateComponent === false && (
          <p className="text-center">No hay Admins</p>
        )} 
        {showCreateComponent === true && (
          <Crear
            setShowCreateComponent={setShowCreateComponent}
            setRefreshAdmins={setRefreshAdmins}
          />
        )}
      </div>
    </div>
  )
}

export default Admins
