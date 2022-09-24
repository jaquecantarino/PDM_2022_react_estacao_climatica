import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'


//Função que define um componente react
//export default function App (){

//classe
class App extends React.Component{
    
    constructor(props){
        super(props)
        console.log('construtor')
        //this.state = { //definição de estado do componente, estado local do componente
          //  latitude: null,
            //longitude: null,
          //  estacao: null, 
          //  data: null,
          //  icone: null,
          //  mensagemDeErro: null
        //}
    }

    state = {
        latitude: null,
        longitude: null,
        estacao: null, 
        data: null,
        icone: null,
        mensagemDeErro: null
    } //outra (forma possivel) alternativa para criar o state, posso usar apenas um.

    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano, 5, 21)
        const d2 = new Date(ano, 8, 22)
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

    // Criando metodos de ciclo de vida do componente.
    componentDidMount(){ //esse cara executa somente uma vez para cada componente react, para cada instancia
        this.oterLocalizacao() //a aplicação já nasce pedindo a localização.
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    componentWillUnmount(){ //esse cara executa somente uma vez para cada componente react, para cada instancia
        console.log('componentWillUnmount')
    }

    render(){
    console.log('render')
    return (
        //criando container
        <div className='container mt-2'> 
        {/* nova linha que me da 12 colunas para ocupar */}
            <div className="row justify-content-center"> 
            {/* identificando que meu conteudo vai usar 8 coluna das linhas  */}
                <div className="col-md-8"> 
                {
                    (!this.state.mensagemDeErro && !this.state.latitude) 
                    ?
                    <Loading />
                    :
                    this.state.mensagemDeErro 
                        ? 
                        <p className="border rounded p-2 fs-1">
                            é preciso dar permissão para acesso à localização
                        </p>
                        :
                        <EstacaoClimatica 
                            icone={this.state.icone}
                            estacao={this.state.estacao}
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            //data={this.state.data}
                            //mensagemDeErro={this.state.mensagemDeErro}
                            oterLocalizacao={this.oterLocalizacao} /* funciona com todos as chamadas, o que muda é a forma de passar */
                        />
                }
                </div>
            </div>
        </div>
        )
    }
}

ReactDOM.render(
    <App/>, //o react está instanciando essa classe e iniciando o ciclo de vida dela.
    document.querySelector('#root')
)
