import React from 'react';
import { armies } from '../../gameStats/armies';

const UnitStack = ({ army, unitId }) => {
    let unit = armies[army].units[unitId];
    return (
        <div className="border rounded-md m-4" style={{ width: "14em" }}>
            <div id="unit-top-bar" className="flex flex-row bg-gray-800 justify-between items-center p-2">
                <div className="flex flex-row">
                    <h2 className="bg-gray-400 p-2 rounded-md text-center">
                        {`${unit.class} unit`}
                    </h2>
                </div>
                <div className="flex flex-row justify-end items-center">
                    <span className="text-red-500 hidden sm:block">Lives</span>
                    <span className="dot rounded-full w-4 h-4 bg-red-500 ml-2"></span>
                </div>
            </div>
            <div id="unit-info-bar" className="flex flex-col p-4 justify-center items-center bg-gray-500">
                <img className="rounded-lg w-full h-auto" src={unit.image} alt="unit-avatar" />
                <div className="flex flex-col flex-wrap justify-center items-center mt-4 mx-4 text-center">
                    <p>
                        {`Name: ${unit.name}`}
                    </p>
                    <p>
                        {`Equipment: ${unit.equipment.range} + ${unit.equipment.melee}`}
                    </p>
                    <p>
                        {`Cost: ${unit.cost}`}
                    </p>
                </div>
            </div>
            <div id="unit-stat-bar" className="w-auto">
                <table className="table-fixed w-full">
                    <thead>
                        <tr className="bg-gray-600">
                            <th className="border px-2">Melee</th>
                            <th className="border px-2">Ranged</th>
                            <th className="border px-2">Defense</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-500">
                            <td className="border px-4 py-2 text-center">{`${unit.melee.roll}d${unit.melee.success}+`}</td>
                            <td className="border px-4 py-2 text-center">{`${unit.range.roll}d${unit.range.success}+`}</td>
                            <td className="border px-4 py-2 text-center">{`${unit.defense.roll}d${unit.defense.success}+`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="unit-spec-bar" className="flex flex-row p-2 h-8 bg-white items-center">
                {`Special abilities: ${unit.specials}`}
            </div>
        </div>
    )
};


export default UnitStack;