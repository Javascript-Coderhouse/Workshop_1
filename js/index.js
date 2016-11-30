

function verificarSiHayTareas() {

	var alerta = document.getElementById("nada");
	var texto = "";
	var contador = 0;
	var ids = 0;
	var nroSpan = 1;
	var datoBorrar = "-";
	var a = "";
	var columna = "";
	var cEditar = 0;
	var lista = document.getElementById("listadoTareas");
	var crearFila = function (texto) {
		
		var fila = document.createElement("tr");
		var boton = document.createElement("button");
		var boton2 = document.createElement("button");
		var icono = document.createElement("span");
		var icono2 = document.createElement("span");

		for (var i = 0; i < 5; i++) {
			if (i < 4) {
				columna = document.createElement("td");
				lista.appendChild(fila);
				fila.appendChild(columna);	
				fila.setAttribute("name" , ids);
				columna.appendChild(document.createTextNode(texto[i]));
							
			} else {
				columna = document.createElement("td");
				lista.appendChild(fila);
				fila.appendChild(columna);	
				columna.appendChild(boton);
				boton.appendChild(icono)
				boton.setAttribute("name", ids);
				document.getElementsByTagName("span")[nroSpan].className = "ion-edit";
				document.getElementsByTagName("button")[nroSpan-1].className = "botonEditar";
				nroSpan++;
				columna.appendChild(boton2);
				boton2.appendChild(icono2);
				boton2.setAttribute("name", ids);
				document.getElementsByTagName("span")[nroSpan].className = "ion-trash-a";
				document.getElementsByTagName("button")[nroSpan-1].className = "botonBorrar";
				nroSpan++;
				ids++;
			};
		}	;
	};
	var cargarLocalStorage = function(veces) {

		for (var i = veces; i < localStorage.length; i++) {
			a = JSON.parse(localStorage.getItem(localStorage.key(i)));
			var final = [localStorage.key(i),a.fecha,a.tarea,"Pending"];
			crearFila(final);
		};
		contador++;
	};
	if (localStorage.length == 0) {
		alerta.innerText = "NO HAY TAREAS";
	} else {
		cargarLocalStorage(contador);
		contador = localStorage.length;


	};

	var datos = {
		tarea: document.getElementById("nuevaTarea"),
		fecha: document.getElementById("fechaTarea")
	}

	var validarInformacion = function() {
		if(datos.tarea.value == "") {
			alerta.innerText = "No hay datos para mostrar";

		} else if (datos.fecha.value == "") {
			alerta.innerText = "la fecha está vacía";
		} else if (agregarTarea.value == "Editar Tarea"){
			editarLocalStorage(cEditar);
			location.reload();
			console.log("editando");
		} else {
			alerta.innerText = "";
			localStorage.setItem("tarea" + Date.now(), JSON.stringify(baseDeDatos));
			cargarLocalStorage(contador);
			location.reload();
		};
		
	};

	var tareaAgregada="";
	var fechaAgregada = "";
	var baseDeDatos = {};

	var agregarTarea = document.getElementById("agregarTarea");
	agregarTarea.onclick = function() {
	
		tareaAgregada = datos.tarea.value;
		fechaAgregada = datos.fecha.value;
		baseDeDatos = {
			tarea: tareaAgregada,
			fecha: fechaAgregada
			
		}
		validarInformacion();

	};
	var tr = document.getElementsByTagName("tr");

	function borrarFila(nroFila) {
		var nroFilaMasUno = nroFila + 1;
		console.log(nroFilaMasUno);
		lista.removeChild(tr[nroFilaMasUno]);		
		localStorage.removeItem(localStorage.key(nroFila));
		location.reload();
		
	};
	
	var borrar = document.getElementsByClassName("botonBorrar");
	var editar = document.getElementsByClassName("botonEditar");
	var filaEditada = document.getElementsByTagName("tr");
	var fechaEditada = "";
	var tareaEditada = "";

	var editarLocalStorage = function(fila) {
		var objeto = JSON.parse(localStorage.getItem(localStorage.key(fila)));
		objeto.tarea = tareaAgregada;
		objeto.fecha = fechaAgregada;
		var datosEditados = JSON.stringify(objeto);
		localStorage.setItem(localStorage.key(fila),datosEditados);

	}

	function borrando(e) {
		borrarFila(Number(e.currentTarget.name));
		console.log(Number(e.currentTarget.name));
	}

	function editando(e) {
		var i = Number(e.currentTarget.name)+1;
		fechaEditada = filaEditada[i].cells[1].innerText;
		tareaEditada = filaEditada[i].cells[2].innerText;
		datos.fecha.value = fechaEditada;
		datos.tarea.value = tareaEditada;
		agregarTarea.value = "Editar Tarea";
		cEditar = i-1;		
	}

	for (var i = 0; i < borrar.length; i++) {
		borrar[i].addEventListener("click", borrando);
		editar[i].addEventListener("click", editando);
	};

	
}
