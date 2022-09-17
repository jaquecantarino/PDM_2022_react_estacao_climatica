import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'


//Função que define um componente react
//export default function App (){

//classe
class App extends React.Component{
    
    constructor(props){
        super(props)
        this.state = { //definição de estado do componente, estado local do componente
            latitude: null,
            longitude: null,
            estacao: null, 
            data: null,
            icone: null,
            mensagemDeErro: null
        }
    }

    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano, 5, 21)
        const d2 = new Date(ano, 8, 24)
        const d3 = new Date(ano, 11, 22)
        const d4 = new Date(ano, 3, 21)
        const sul = latitude < 0
        if (data >= d1 && data < d2){
            return sul ? 'Inverno' : 'Verão'
        }
        if (data >= d2 && data < d3){
            return sul ? 'Primavera' : 'Outono'
        }
        if (data >= d3 && data < d4){
            return sul ? 'Verão' : 'Inverno'
        }
        return sul ? 'Outono' : 'Primavera'
    }

    //objeto json de mapeando, explicando qual icone vai ser usado em casa estação
    icones = {
        "Primavera" : "fa-seedling",
        "Verão": "fa-umbrela-beach",
        "Outono": "fa-tree",
        "Inverno": "fa-snowman"
    }

    oterLocalizacao = () => {
        //para acessar a api de localizaçõa (geolocation)
        //função que faz a janelinha que pergunta ao usuario se ele permite usar a localização dele ou não
        window.navigator.geolocation.getCurrentPosition(
            //arrow function para obter a localização do usuario 
            (position) => {
                let data = new Date() //construindo um objeto que armazena a data atual
                let estacao = this.obterEstacao(data, position.coords.latitude) //passa a data atual do sistema e a latitude da localização do usuario
                let icone = this.icones[estacao] //acessando os icones de cada estação
                //como eu atualizo a tela estando em react?r: atualizo o estado do componente
                //para atualizar o estado do componente:
                this.setState({
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude,
                    data: data.toLocaleString(),
                    estacao: estacao,
                    icone: icone
                })
            },
            (erro) => {
                this.setState({mensagemDeErro: 'Ative a sua localização para ver a estação.'})
            }
        ) 
        //opera de maneira assincrona.
    }

        render(){
        return (
            //criando container
            <div className='container mt-2'> 
            {/* nova linha que me da 12 colunas para ocupar */}
                <div className="row justify-content-center"> 
                {/* identificando que meu conteudo vai usar 8 coluna das linhas  */}
                    <div className="col-md-8"> 
                    {/* criando card pai */}
                        <div className="card"> 
                        {/* filho do card */}
                            <div className="card body"> 
                            {/* dentro do card vamos criar um novo retangulo que abriga um texto e um icone */}
                                <div className="d-flex align-items-center border rounded mb-2" style={{height: '6rem'}}>
                                    {/* considerando o estado do icone criado acima como parametro para mostrar o icone correto */}
                                    <i className={`fas fa-5x ${this.state.icone}`}></i>
                                    <p className="w-75 ms-3 text-center fs-1"> {this.state.estacao} </p>
                                </div>
                                <div>
                                    <p className="text-center">
                                        {/* "tenario" condicao se sim v1 se não v2
                                        condicao ? v1 : v2 */}
                                        {
                                            this.state.latitude ? //existe latitude?
                                                ` Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}. ` //se tiver mostra essa
                                            : //indica o "se não"
                                            this.state.mensagemDeErro ? `${this.state.mensagemDeErro}` :
                                                ` Clique no botão para saber a sua estação climática ` //se não tiver mostra essa
                                        }
                                    </p>
                                </div>
                                <button 
                                    onClick={this.oterLocalizacao}
                                    className='btn btn-outline-primary w-100 mt-2'>
                                        Qual a minha estação?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)
