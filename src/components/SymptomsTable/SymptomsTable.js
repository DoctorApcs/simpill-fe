import classNames from 'classnames/bind';
import style from './SymptomsTable.module.scss';

import { Table } from 'react-bootstrap';
import { findAreaNameByAreaId, findSymptomNameBySymptomId } from '~/handler';

const cx = classNames.bind(style);
function SymptomsTable({ areas }) {
    return (
        <Table responsive={true}>
            <tbody>
                {areas.map((area, index) => (
                    <tr key={index}>
                        <td className={cx('area-name')}>{findAreaNameByAreaId(area.areaId)}</td>
                        <td>
                            {area.symptomIds.map((symptomId, index_2) => (
                                <label key={index_2} className={cx('symptom-name')}>
                                    {findSymptomNameBySymptomId(symptomId)}
                                </label>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default SymptomsTable;
