var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require("web3");

web3 = new Web3("http://localhost:8545");

coinbase = "0x0746b306b201889498da9c69963f42d5b01f864f";
var contractAddress = "0xdbc7ff572a0c0697a53e97179a16b8dc9c81427f";
var contractAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Publickey",
				"type": "address"
			},
			{
				"name": "_Id",
				"type": "uint256"
			},
			{
				"name": "_Name",
				"type": "string"
			},
			{
				"name": "_Age",
				"type": "uint256"
			},
			{
				"name": "_MyGender",
				"type": "uint8"
			},
			{
				"name": "_Email",
				"type": "string"
			},
			{
				"name": "_HospitalId",
				"type": "uint256"
			},
			{
				"name": "_Qualification",
				"type": "string"
			}
		],
		"name": "setDoctor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Publickey",
				"type": "address"
			},
			{
				"name": "_Id",
				"type": "uint256"
			},
			{
				"name": "_Name",
				"type": "string"
			},
			{
				"name": "_Email",
				"type": "string"
			},
			{
				"name": "_Phone",
				"type": "uint256"
			},
			{
				"name": "_Addrs",
				"type": "string"
			}
		],
		"name": "setHospital",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Publickey",
				"type": "address"
			},
			{
				"name": "_Id",
				"type": "uint256"
			},
			{
				"name": "_Name",
				"type": "string"
			},
			{
				"name": "_Age",
				"type": "uint256"
			},
			{
				"name": "_MyGender",
				"type": "uint8"
			},
			{
				"name": "_Phone",
				"type": "uint256"
			},
			{
				"name": "_Email",
				"type": "string"
			},
			{
				"name": "_Addrs",
				"type": "string"
			}
		],
		"name": "setPatient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_Id",
				"type": "uint256"
			},
			{
				"name": "_DoctorId",
				"type": "uint256"
			},
			{
				"name": "_Hospital",
				"type": "uint256"
			},
			{
				"name": "_Observation",
				"type": "string"
			},
			{
				"name": "_Disease",
				"type": "string"
			},
			{
				"name": "_Medicine",
				"type": "string"
			}
		],
		"name": "setTreatmentDetails",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DoctorList",
		"outputs": [
			{
				"name": "Publickey",
				"type": "address"
			},
			{
				"name": "Id",
				"type": "uint256"
			},
			{
				"name": "Name",
				"type": "string"
			},
			{
				"name": "Age",
				"type": "uint256"
			},
			{
				"name": "MyGender",
				"type": "uint8"
			},
			{
				"name": "Email",
				"type": "string"
			},
			{
				"name": "HospitalId",
				"type": "uint256"
			},
			{
				"name": "Qualification",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "getDoctor",
		"outputs": [
			{
				"name": "_Publickey",
				"type": "address"
			},
			{
				"name": "_Id1",
				"type": "uint256"
			},
			{
				"name": "_Name",
				"type": "string"
			},
			{
				"name": "_Age",
				"type": "uint256"
			},
			{
				"name": "_MyGender",
				"type": "uint8"
			},
			{
				"name": "_Email",
				"type": "string"
			},
			{
				"name": "_HospitalId",
				"type": "uint256"
			},
			{
				"name": "_Qualification",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "getHospital",
		"outputs": [
			{
				"name": "_Publickey",
				"type": "address"
			},
			{
				"name": "_Id1",
				"type": "uint256"
			},
			{
				"name": "_Name",
				"type": "string"
			},
			{
				"name": "_Email",
				"type": "string"
			},
			{
				"name": "_Phone",
				"type": "uint256"
			},
			{
				"name": "_Addrs",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "getPatient",
		"outputs": [
			{
				"name": "_Publickey",
				"type": "address"
			},
			{
				"name": "_Id1",
				"type": "uint256"
			},
			{
				"name": "_Name",
				"type": "string"
			},
			{
				"name": "_Age",
				"type": "uint256"
			},
			{
				"name": "_MyGender",
				"type": "uint8"
			},
			{
				"name": "_Phone",
				"type": "uint256"
			},
			{
				"name": "_Email",
				"type": "string"
			},
			{
				"name": "_Addrs",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "getTreament",
		"outputs": [
			{
				"name": "_Id1",
				"type": "uint256"
			},
			{
				"name": "_DoctorId",
				"type": "uint256"
			},
			{
				"name": "_Hospital",
				"type": "uint256"
			},
			{
				"name": "_Observation",
				"type": "string"
			},
			{
				"name": "_Disease",
				"type": "string"
			},
			{
				"name": "_Medicine",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "HospitalDetails",
		"outputs": [
			{
				"name": "Publickey",
				"type": "address"
			},
			{
				"name": "Id",
				"type": "uint256"
			},
			{
				"name": "Name",
				"type": "string"
			},
			{
				"name": "Email",
				"type": "string"
			},
			{
				"name": "Phone",
				"type": "uint256"
			},
			{
				"name": "Addrs",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "PatientDetails",
		"outputs": [
			{
				"name": "Publickey",
				"type": "address"
			},
			{
				"name": "Id",
				"type": "uint256"
			},
			{
				"name": "Name",
				"type": "string"
			},
			{
				"name": "Age",
				"type": "uint256"
			},
			{
				"name": "MyGender",
				"type": "uint8"
			},
			{
				"name": "Phone",
				"type": "uint256"
			},
			{
				"name": "Email",
				"type": "string"
			},
			{
				"name": "Addrs",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Treatmentdetails",
		"outputs": [
			{
				"name": "Id",
				"type": "uint256"
			},
			{
				"name": "DoctorId",
				"type": "uint256"
			},
			{
				"name": "Hospital",
				"type": "uint256"
			},
			{
				"name": "Observation",
				"type": "string"
			},
			{
				"name": "Disease",
				"type": "string"
			},
			{
				"name": "Medicine",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];





Medichain = new web3.eth.Contract(contractAbi, contractAddress);

var indexRouter = require('./routes/index');
var doctorRouter = require('./routes/doctor');
var hospitalRouter = require('./routes/hospital');
var adminRouter = require('./routes/admin');
var patientRouter = require('./routes/patient');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use('/hospital', hospitalRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
