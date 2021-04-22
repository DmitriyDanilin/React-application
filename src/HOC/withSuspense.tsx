import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Preloader from '../components/Preloader/Preloader';


export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) =>{
        <React.Suspense fallback={<Preloader/>}><WrappedComponent {...props} /></React.Suspense>
    }
}
