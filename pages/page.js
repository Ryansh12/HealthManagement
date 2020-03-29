import React, { Component } from 'react';
import {Link} from '../routes'

export class page extends Component {
    render() {
        return (
            <Link route='OwnerHomePage' params={{slug: '0xB68F268aCB52bfC3732b1126e859EFE008e6A336'}}>
            <a>Hello world</a>
            </Link>
        )
    }
}

export default page