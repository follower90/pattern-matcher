var assert = require('assert');
var expect = require('expect.js');
var patternMatcher = require('../src/pattern-matcher');

var match = patternMatcher.match;
var type = patternMatcher.type;

describe('patternMatcher', function() {
    it('should match specified type and have default case if doesnt match', function() {
        var calculate = function(value) {
            return match(value)
                .case(type.number, function(x) { return x + 1; })
                .default(function() { return 0; })
                .get();
        } 

        expect(calculate(3)).to.eql(4);
        expect(calculate('test')).to.eql(0);
    });

    it('should match custom matcher function', function() {
        var calculate = function(value) {
            return match(value)
                .case(type.custom(function(num) { return num < 5; }), function(num) { return num  + '__less_than_5'; })
                .default(function(num) { return num  + '__greater_or_equal_5'; })
                .get();
        } 

        expect(calculate(10)).to.eql('10__greater_or_equal_5');
        expect(calculate(1)).to.eql('1__less_than_5');
    });

    it('should match array type', function() {
        var calculate = function(value) {
            return match(value)
                .case(type.array, function(num) { return num.map(function(x) { return x * 2; }) })
                .default(function(num) { return []; })
                .get();
        } 

        expect(calculate([1, 2, 4])).to.eql([2, 4, 8]);
        expect(calculate('test string')).to.eql([]);
    });

    it('should match date with instance type matcher', function() {
        var calculate = function(value) {
            return match(value)
                .case(type.instance(Date), function(val) { return val; })
                .default(function(val) { return 'its string'; })
                .get();
        } 

        expect(calculate(new Date())).to.be.a(Date);
        expect(calculate('test string')).to.eql('its string');
    });

    it('should match null value', function() {
        var calculate = function(value) {
            return match(value)
                .case(type.null, function(val) { return 'NULL'; })
                .case(type.string, function(val) { return 'string'; })
                .get();
        } 

        expect(calculate(null)).to.eql('NULL');
        expect(calculate('test string')).to.eql('string');
    });

    it('should match regex', function() {
        var calculate = function(value) {
            return match(value)
                .case(type.regex(/^.*\sHell$/), function(val) { return 'hell matched'; })
                .case(type.regex(/^.*\sWorld$/), function(val) { return 'world matched'; })
                .get();
        } 

        expect(calculate('Hello, World')).to.eql('world matched');
        expect(calculate('Hello, Hell')).to.eql('hell matched');
    });

    it('should work with default case', function() {
        var calculate = function(value) {
            return match(value)
                .case(type.array, function(val) { return val; })
                .case(type.number, function(val) { return val; })
                .default(function(val) { return 'Not an array and not a number'})
                .get();
        } 

        expect(calculate('Hello, World')).to.eql('Not an array and not a number');
        expect(calculate(123)).to.eql(123);
    });
});  
