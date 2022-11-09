import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { DataClicks, DataSubtipo, DataFinal } from 'types/global'
import { filterCantidadesSubTipo, filterCantidadesTipo } from '../utils/functions'
import { AiOutlineLoading } from 'react-icons/ai'
import 'animate.css';

const Index = () => {
  const [buttonCsv, setButtonCsv] = useState(false)
  const [datosCsv, setDatosCsv] = useState([])
	const [filterDatos, setFilterDatos] = useState<DataFinal[]>([])
  const [state, setState] = useState({
	loading: false,
	error: ''
  })
  const [horario, setHorario] = useState('')
  const SIZE = '30px'
 
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    // console.log('value', value)

    let url: string = ''

    if(value === '1') {
      url = 'https://clicks-granix.herokuapp.com/api/v1/click'
    }

		if(value === '2') {
			url = 'https://api-clicks.herokuapp.com/api/v1/click/template/Chocolate'
		}

   await obtenerDatos(url)

  }

  const obtenerDatos = async (url: string) => {
	setState({
		loading: true,
		error: ''
	})
    // console.log('url', url)

    const res = await fetch(`${url}` , {
      method: 'GET',
      headers: {
				'Content-Type': 'application/json'
			},
    })

    const data = await res.json()

    // console.log('data', data)

    if(data.success){
      setButtonCsv(true)
      setDatosCsv(data.data)
	  setState({
		loading: false,
		error: ''
	  })
    } else {
      setState({
		loading: false,
		error: 'Hubo un Error al recuperar los datos'
	  })
    }
  }

  const descargarCsv = () => {
  // console.log('filterDatos', filterDatos)
  let csvParseado
  csvParseado = Papa.unparse(filterDatos, {
		delimiter: ",",
		header: true
	})
  // console.log('csvParseado', csvParseado)
  const blob: Blob = new Blob([csvParseado], { type: `text/csv;charset=utf8;` })
			const url = URL.createObjectURL(blob)
			const a = document.createElement(`a`)

			a.href = url
			a.target = `_blank`
			a.download = `PruebaClicksGranix.csv`
			document.body.appendChild(a)
			a.click()
			a.remove()// This will download the data file named "my_data.csv".
  }

  const filterTipo = (array: DataClicks[]) => {
		const arrayToFilter = array

		const arrayTipo: any = []

		for (let i = 0; i < arrayToFilter.length; i++) {
			
				arrayTipo.push(arrayToFilter[i].tipo)

		}
		//  console.log(`arrayTipo`, arrayTipo)

     const arrayNuevo: any = [...new Set(arrayTipo)]
    
    // console.log('arrayNuevo', arrayNuevo)
		return arrayNuevo
 
	}

  const filterSubTipo = (array: DataClicks[]) => {
		const arrayToFilter = array

		const arraySubTipo: DataSubtipo[] = []

		for (let i = 0; i < arrayToFilter.length; i++) {
			
				arraySubTipo.push({
          "tipo": arrayToFilter[i].tipo,
          "subTipo": arrayToFilter[i].subTipo
        })

		}
		//  console.log(`arraySubTipo`, arraySubTipo)

     const unique = arraySubTipo.filter((value, index, self) =>

       index === self.findIndex((t) => (
         t.tipo === value.tipo && t.subTipo === value.subTipo
       ))
     )
//  console.log('unique', unique)
 return unique
	}

  const cantSubTipo = (array: DataClicks[], arraySubTipo: DataSubtipo[]) => {
		// const arrayToFilter = array

		const arrayCantidades: any[] = []

		for(let j = 0; j < arraySubTipo.length; j++) {
			const tipo = arraySubTipo[j].tipo
			const subTipo = arraySubTipo[j].subTipo

			const cantidad = filterCantidadesSubTipo(array, tipo, subTipo)

			arrayCantidades.push({
				"tipo": tipo,
				"subTipo": subTipo,
				"cantidad": cantidad
			})

		}
		arrayCantidades.sort(function(a, b){
			let x = a.tipo.toLowerCase()
			let y = b.tipo.toLowerCase()
			if(x < y) {return -1}
			if(x> y){ return 1}
			return 0
		})
		console.log(`arrayCantidades`, arrayCantidades)
		return arrayCantidades
	}

	const cantTipo = (array: DataClicks[], arrayTipo: string[]) => {

		const arrayCantidades: any[] = []

		for(let j = 0; j < arrayTipo.length; j++) {
			const tipo = arrayTipo[j]

			const cantidad = filterCantidadesTipo(array, tipo)

			arrayCantidades.push({
				"tipo": tipo,
				"subTipo": '',
				"cantidad": cantidad
			})

		}
		arrayCantidades.sort(function(a, b){
			let x = a.tipo.toLowerCase()
			let y = b.tipo.toLowerCase()
			if(x < y) {return -1}
			if(x> y){ return 1}
			return 0
		})
		//  console.log(`arrayCantidades`, arrayCantidades)
		return arrayCantidades
	}

const unirCsv = (arrayTipos: any[], arraySubtipos: any[]) => {
	let csvFinal:any[] = arrayTipos.concat(arraySubtipos)

	return csvFinal
}
	useEffect(() => {
		if(datosCsv) {
			const filterDatos = () => {
				const datosFiltrados = filterSubTipo(datosCsv)
				const datosFiltradosTipo = filterTipo(datosCsv)
				// console.log('datosFiltrados', datosFiltrados)
				const arrayCantidadesSubtipo = cantSubTipo(datosCsv, datosFiltrados)
				const arrayCantidadesTipo = cantTipo(datosCsv, datosFiltradosTipo)
				const csvTotal = unirCsv(arrayCantidadesTipo, arrayCantidadesSubtipo)
				console.log('csvTotal', csvTotal)
				setFilterDatos(csvTotal)
			}
			filterDatos()
		}
	}, [datosCsv])

	let formato

	useEffect(() => {
		const fechaHorario  = () => {
			const hoy = new Date();	
			
			let dia = hoy.getDate().toString();
			let mes = (hoy.getMonth() + 1).toString();
			let anio = hoy.getFullYear().toString();
			let hora = hoy.getHours().toString();
			let minutos = hoy.getMinutes().toString();
			let segundos = hoy.getSeconds();
			
			 dia = ('0' + dia).slice(-2);
			 mes = ('0' + mes).slice(-2);
			 hora = ('0' + hora).slice(-2);
			 minutos = ('0' + minutos).slice(-2);
			
			formato = `${dia}/${mes}/${anio} - ${hora}:${minutos}:${segundos}`;
			setHorario(formato)
	
			console.log('formato', formato)
			
		}

		setTimeout(function(){ fechaHorario()}, 50)

	}, [horario])
	
	console.log('datosCsv', filterDatos)

  return (
	<div className='w-full min-h-screen'>
    <div className='w-full min-h-screen bg-gradient-to-b from-blue-400 to-indigo-500'>
		<div className='justify-end pt-2 text-lg text-center text-white font-fue/nte-montserrat'>
		</div>
      <div className='flex justify-start w-full'>
      <img className='w-24 h-14' src='/logo.png'></img>
	  <div className='mt-4 text-lg font-medium text-gray-100 font-fuente-raleway animate__animated animate__tada' >
	  Gestion de Clicks
	  </div>
      </div>
      <div className='pt-4'>
      <div className='flex flex-col items-center justify-center w-full '>
        <div className='flex flex-col items-center pt-3 pr-6 bg-blue-200 border-4 shadow-lg 2xl:w-3/12 rounded-3xl h-36 border-indigo-700/100 sm:w-6/12'>
          <label className='block font-sans text-xl font-medium text-center font-fuente-roboto'>
            Seleccione la Base de Datos:
            <select className='w-11/12 mx-4 my-2 bg-white rounded-md shadow-md' onChange={(e) => handleChange(e)}>
              <option value=''>Seleccionar</option>
              <option value='1'>Granix</option>
							<option value='2'>100 Ducados</option>
            </select>
          </label>
          {buttonCsv && (
            <button onClick={descargarCsv} type='button' className='px-4 py-2 font-medium text-white border-2 border-purple-500 rounded shadow-xl bg-gradient-to-tr from-blue-500 to-fuchsia-500 hover:border-solid border-hidden font-fuente-raleway'>
              Descargar Csv
            </button>
          )}
          {state.error && (
            <p className='text-xl italic text-red-500'>{state.error}</p>
          )}
        </div>
      </div>
	  {state.loading && (
		<div className='flex items-center justify-center w-full mt-10'>
			<div className='animate-spin'>
			<AiOutlineLoading size={SIZE} className='text-white fill-current' />
			</div>
		</div>
		  )}
			<div>
					{datosCsv && datosCsv.length > 0 && (
						<div className='block overflow-x-auto'>
						 <table className='w-2/6 mx-auto text-gray-100 bg-indigo-600 rounded-md shadow-xl m-7 animate__animated animate__fadeInRightBig'> 
							<thead>
								<tr className='border-b-2 border-indigo-300 '>
									<th className='w-3/12 h-12 tracking-wide border-b border-indigo-400 font-fuente-raleway'>Tipo</th>
									<th className='w-3/12 h-12 tracking-wide border-b border-indigo-400 font-fuente-raleway'>Subtipo</th>
									<th className='w-3/12 h-12 tracking-wide border-b border-indigo-400 font-fuente-raleway'>Cantidad</th>
								</tr>
							</thead>
							<tbody>
								{filterDatos && filterDatos.map((clicks, i) => {
									return (
										<tr className='text-center shadow-sm' key={i}>
											<td className='w-3/12 h-10 font-light tracking-wide border-b border-indigo-400 font-fuente-roboto'>{clicks.tipo}</td>
											<td className='w-3/12 h-10 font-light tracking-wide border-b border-indigo-400 font-fuente-roboto'>{clicks.subTipo}</td>
											<td className='w-3/12 h-10 font-light tracking-wide border-b border-indigo-400 font-fuente-roboto'>{clicks.cantidad}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
						</div>
					)}
				</div>
      </div>
    </div>
	</div>
  )
}

export default Index