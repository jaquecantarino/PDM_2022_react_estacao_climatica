import React, { Component } from 'react'


export default class Loading extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center align-items-center border rounded p-3'>
                <div class="spinner-border text-success" role="status" style={{width: '3rem', height: '3rem'}}>
                    <span class="visually-hidden">Carregando...</span>
                </div>
            </div>
        )
    }
}
