import {Button as MuiButton, CardHeader,} from "@mui/material";
import {Form, Formik} from "formik";
import {PolicyEditor} from './components/Policy';
import {IModel, IProduct} from "./interfaces/ModelInterface";
import './styles/CreateModel.css';
import styled from "@emotion/styled";
import {spacing} from "@mui/system";
import modelsJson from "./models.json";
import React from "react";
import axios from 'axios';
import {ModelDataGrid} from "./ModelDataGrid";

const Button = styled(MuiButton)(spacing);

const mj = modelsJson[0];
const oneModel:IModel = {
    ...mj,
    factors: mj.factors.map(f => ({
        ...f, 
        subFactors: f.subFactors.map(sf => ({
            ...sf, 
            signals: sf.signals.map(sig => ({
                ...sig, 
                criteria: [sig.criteria]
            }))
        }))
    }))
};

function PreviewModel() {
    const backendUrl: string = (process.env.REACT_APP_BACKEND_URL as string)
    const [products, setProducts] = React.useState<IProduct[]>([]);// to populate all the products
    return (
        <Formik
            initialValues={oneModel}
            onSubmit={(values) => {
                console.log(JSON.stringify(values, null, 2))
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {formik => {
                axios.get(`${backendUrl}/products/all`).
                    then((response: any) => {
                        setProducts(response.data)
                    }).catch((e: any) => {
                        // Notify error on failure to fetch all products
                        console.log(e);
                    });
                const v = formik.values;
                return (
                    <Form>
                        <CardHeader title={"Preview Model"} titleTypographyProps={{ variant: "h3" }}
                            action={
                                <Button mr={1} type="submit" variant='contained' style={{ backgroundColor: '#434DB0', color: '#fff' }} size="medium">Submit</Button>
                            } />


                        <div style={{ pointerEvents: "none" }}>
                            <PolicyEditor products={products} />
                        </div>

                        <ModelDataGrid model={oneModel} />
                    </Form>
                );
            }}
        </Formik>
    )
}

export default PreviewModel;
