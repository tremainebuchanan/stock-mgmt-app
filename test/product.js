const mongoose = require('mongoose')
const Product = require('../models/product').Product
const service = require('../services/product')

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = require('chai').should;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
