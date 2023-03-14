import "bootstrap/dist/css/bootstrap.min.css"
import './styles/style.css';
import { useState } from "react";
import { Button, InputNumber, Row, Alert } from 'antd';
import Layout from "antd/es/layout/layout";
import { encode } from "base-64";

const App = () => {

    const [isVisibleError, setIsVisibleError] = useState(false);
    const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);
    const [isVisibleInfoTiles, setIsVisibleInfoTiles] = useState(false);
    const [isVisibleWarningFields, setIsVisibleWarningFields] = useState(false);
    const [textTiles, setTextTiles] = useState('');
    const [textSolution, setTextSolution] = useState('');
    const [firstValue, setFirstValue] = useState('1');
    const [secondValue, setSecondValue] = useState('2');
    const [tiles, setTiles] = useState([]);

    const push = () => {

        var isInvalidPush = firstValue === '' || secondValue === '' || secondValue === null || firstValue === null;
        if (isInvalidPush) {
            setIsVisibleWarningFields(true);
        } else {
            var tilesTemp = [...tiles];
            tilesTemp.push([firstValue, secondValue]);
            setTiles(tilesTemp);

            var textTilesTemp = "";
            if (textTiles === '') {
                textTilesTemp = "[ " + firstValue + " | " + secondValue + " ]";
            } else {
                textTilesTemp = textTiles + " - [ " + firstValue + " | " + secondValue + " ]";
            }
            setTextTiles(textTilesTemp);
        }
    }

    const refactorTextSolution = (data) => {
        var textSolution = "";
        for (let i in data) {

            if (textSolution === '') {
                textSolution += "[ ";
            } else {
                textSolution += " - [ ";
            }

            textSolution += data[i][0] + " | " + data[i][1]+ " ]";
        }

        return textSolution;
    }

    const resolve = async () => {

        var isThereRestriction = tiles.length < 2;
        if (isThereRestriction) {
            setIsVisibleInfoTiles(true);
        } else {

            let username = "ander@inalambria.com";
            let password = "An#er32345InAsFd$";

            const response = await fetch("api/domino", {
                method: "POST",
                headers: new Headers({
                    'Authorization': 'Basic ' + encode(username + ":" + password),
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ tiles: tiles })
            })

            if (response.ok) {
                response.json().then(data => {
                    console.log(data.result);

                    if (data.result.length === 0) {
                        setIsVisibleError(true);
                        setTextSolution("");
                    } else {
                        setTextSolution(refactorTextSolution(data.result));
                        setIsVisibleSuccess(true);
                    }
                })
            }
        }
    }

    const handleCloseWarningFields = () => {
        setIsVisibleWarningFields(false);
    };


    const handleCloseInfoTiles = () => {
        setIsVisibleInfoTiles(false);
    };

    const handleCloseError = () => {
        setIsVisibleError(false);
    };


    const handleCloseSuccess = () => {
        setIsVisibleSuccess(false);
    };

    function AlertWarningFieldsEmpty() {
        if (isVisibleWarningFields) {
            return (<Alert message="Please do not leave any field empty!" type="warning" showIcon closable
                afterClose={handleCloseWarningFields} />);
        }

        return (<></>);
    }

    function AlertInfoTiles() {
        if (isVisibleInfoTiles) {
            return (<Alert message="Please enter a minimum of 2 tiles!" type="info" showIcon closable
                afterClose={handleCloseInfoTiles} />);
        }

        return (<></>);
    }

    function AlertSuccess() {
        if (isVisibleSuccess) {
            return (<Alert message="Solution successfully found!" type="success" showIcon closable
                afterClose={handleCloseSuccess} />);
        }

        return (<></>);
    }

    function AlertError() {
        if (isVisibleError) {
            return (<Alert message="Solution not found!" type="error" showIcon closable
                afterClose={handleCloseError} />);
        }

        return (<></>);
    }

    return (
        <Layout className="layout">
            <AlertError />
            <AlertSuccess />
            <AlertWarningFieldsEmpty />
            <AlertInfoTiles />

            <Row justify='center' className="row-head">
                <InputNumber type="number" min={1} max={6} value={firstValue} onChange={setFirstValue}
                    defaultValue={1} placeholder="First Tile" className="input-first" />
                <InputNumber type="number" min={1} max={6} value={secondValue} onChange={setSecondValue}
                    defaultValue={2} placeholder="Second Tile" className="input-second" />
                <Button type="primary" onClick={push} className="button-add" >
                    Push
                </Button>
                <Button type="primary" onClick={resolve} className="button-resolve">
                    Resolve
                </Button>
            </Row>

            <Row justify='center' className="row-body">
                <p className="p-body">Tiles:</p>
                <p className="p-value-body">{textTiles}</p>
            </Row>

            <Row justify='center' className="row-body">
                <p className="p-body">Solution:</p>
                <p className="p-value-body">{textSolution}</p>
            </Row>
        </Layout> 
        )
}

export default App;
