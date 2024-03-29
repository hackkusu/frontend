import React from 'react';
import { Link } from 'react-router-dom';

// const formateDate = (date, format) => {
//     const dateFormat = format ? format : "DD MMM Y";
//     const date1 = moment(new Date(date)).format(dateFormat);
//     return date1;
// };
// const toLowerCase1 = str => {
//     return (
//       str === "" || str === undefined ? "" : str.toLowerCase()
//     );
//   };

const InvoiceId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const BillingName = (cell) => {
    return cell.value ? cell.value : '';
};

const Date = (cell) => {
    return cell.value ? cell.value : '';
};

const Amount = (cell) => {
    return "$" + cell.value ? "$" + cell.value : '';
};

const InvoiceStatus = (cell) => {
    switch (cell.value) {
        case "Pending":
            return (<span className="badge badge-pill bg-pill font-size-12 bg-warning-subtle text-warning badge bg-secondary">{cell.value}</span>);
        case "Paid":
            return (<span className="badge badge-pill bg-pill font-size-12 bg-success-subtle text-success badge bg-secondary">{cell.value}</span>);
        default:
            return (<span className="badge badge-pill bg-pill font-size-12 bg-success-subtle text-success badge bg-secondary">{cell.value}</span>);
    }
};

const DownloadPdf = (cell) => {
    return (
        <button className="btn btn-light btn-sm w-xs">Pdf <i className="uil uil-download-alt ms-2"></i></button>
    );
};

export {
    InvoiceId,
    BillingName,
    Date,
    Amount,
    InvoiceStatus,
    DownloadPdf
};