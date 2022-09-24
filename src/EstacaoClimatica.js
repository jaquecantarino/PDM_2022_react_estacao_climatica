import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class EstacaoClimatica extends Component {
    /* uma variavel pertence ao estado do componente quando eu quero atualizar a pagina junto com a variavel */
    timer = null /* identificador do timer a ser criado */

    state = {
        data : null
    }

    componentDidMount(){
        console.log("EC: componenteDidMount") /* só pra acompanhar que está sendo achamado */
        /* atribuindo a timer para fazer referencia no futuro */
        this.timer = setInterval(() => {
            this.setState({data: new Date().toLocaleTimeString()}) /* pega a hora do computador */
        }, 1000) /* a cada 1000 milisegundos vai atualizar*/
    }

    componentWillUnmount(){
        console.log("EC: componenteWillUnMount") /* só pra acompanhar que está sendo achamado */
        clearInterval(this.timer) /* mata o timer quando a aplicação morrer */
    }

    render() {
        console.log("EC: render") /* só pra acompanhar que está sendo achamado */
        return (
            /* criando card pai */
            <div className="card" >
                {/* filho do card */}
                <div className="card body" >
                    {/* dentro do card vamos criar um novo retangulo que abriga um texto e um icone */}
                    < div className="d-flex align-items-center border rounded mb-2" style={{ height: '6rem' }}>
                        {/* considerando o estado do icone criado acima como parametro para mostrar o icone correto */}
                        <i className={`fas fa-5x ${this.props.icone}`}></i>
                        <p className="w-75 ms-3 text-center fs-1"> {this.props.estacao} </p>
                    </div >
                    <>
                        <div>
                            <p className="text-center">
                                {/* "tenario" condicao se sim v1 se não v2 condicao ? v1 : v2 */}
                                {this.props.latitude ? //existe latitude?
                                    ` Coordenadas: ${this.props.latitude}, ${this.props.longitude}. Data: ${this.state.data}. ` //se tiver mostra essa
                                    : //indica o "se não"
                                    ` Clique no botão para saber a sua estação climática ` //se não tiver mostra essa
                                }
                            </p>
                        </div>
                        <button
                            onClick={this.props.oterLocalizacao}
                            className='btn btn-outline-primary w-100 mt-2'>
                            Qual a minha estação?
                        </button></>
                    {/* Criando o botão que vai matar a aplicação para exemplificar seu uso. */}
                    <button
                        className="btn btn-outline-danger w-100 mt-2"
                        onClick={() => {
                            ReactDOM.unmountComponentAtNode(document.querySelector('#root'))
                        }
                        }>
                        Unmount ◡̈
                    </button>
                </div>
            </div>
        )
    }
}
