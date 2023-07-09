
import React from 'react';
import { Button } from 'primereact/button';

export default function LoginForm() {
    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up With Google" icon="pi pi-user-plus" className="p-button-success"></Button>
                </div>
            </div>
        </div>
    )
}
