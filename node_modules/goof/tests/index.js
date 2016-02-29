// Mocha Validation tests

var chai = require("chai"),
    expect = chai.expect,
    Util = require("util"),
    goof = require("../lib")(),
    Errors = goof.Errors,
    Messages = goof.Messages;


describe("Errors", function() {

    beforeEach(function() {

    });


    describe("Messages Tests", function() {

        it("Load Default Messages", function () {

            var obj = require("../lib")().Messages;
            expect(obj.length).to.equal(12);
            expect("success").to.equal(obj.getMessage("SUCCESS"));
        });

        it("Load Resource File Successfully", function () {
            var obj = require("../lib")("./").Messages;
            obj.reload();
            expect(14).to.equal(obj.length);
        });

        it("Override Success text", function () {
            var obj = require("../lib")("./").Messages;
            expect(obj.getMessage("SUCCESS")).to.equal("this is success");
        });

        it("Override Success text after recreation of Message Object should not revert", function () {
            var obj = require("../lib")("./").Messages;
            expect(obj.getMessage("SUCCESS")).to.equal("this is success");

            obj = require("../lib")().Messages;
            expect(obj.getMessage("SUCCESS")).to.equal("this is success");
        });

        it("After Reload Messages success message should revert to original state", function () {
            var obj = require("../lib")().Messages;
            obj.reload();
            expect(obj.getMessage("SUCCESS")).to.equal("success");

        });
    });

    describe("Custom error cases", function() {


        it("Application Error must contain httpCode =500 and passed error_message", function() {

            var error = new Errors.applicationError("this is message");
            expect(error.error_message).to.equal("this is message");
            expect(error.httpCode).to.equal("500");

        });


        it("throw Application Error and catch it, check type, check if error message and httpCode are set", function() {

            try{
                throw new Errors.applicationError("this is message");
            }
            catch(error){
                expect(error.name).to.equal("applicationError");
                expect(error.error_message).to.equal("this is message");
                expect(error.httpCode).to.equal("500");
            }


        });

        it("Authentication Error must contain httpCode = 401 and default error message", function() {

            var error = new Errors.unAuthenticatedError();
            expect(error.error_message).to.equal(Messages.getMessage("AUTH_FAILED"));
            expect(error.httpCode).to.equal("401");

        });

        it("throw Authentication Error must contain httpCode = 401 and default error message", function() {

            try{
                throw new Errors.unAuthenticatedError();
            }
            catch(error){
                expect(error.name).to.equal("unAuthenticatedError");
                expect(error.error_message).to.equal(Messages.getMessage("AUTH_FAILED"));
                expect(error.httpCode).to.equal("401");
            }


        });

        it("throw Authentication Error must contain httpCode = 401 and custom error message", function() {

            try{
                throw new Errors.unAuthenticatedError("this is custom error message");
            }
            catch(error){
                expect(error.name).to.equal("unAuthenticatedError");
                expect(error.error_message).to.equal("this is custom error message");
                expect(error.httpCode).to.equal("401");
            }


        });

        it("unAuthorizedError must contain httpCode = 403 and default error message", function() {

            var error = new Errors.unAuthorizedError();
            expect(error.error_message).to.equal(Messages.getMessage("AUTHORIZATION_FAILED"));
            expect(error.httpCode).to.equal("403");

        });

        it("throw Authentication Error must contain httpCode = 401 and default error message", function() {

            try{
                throw new Errors.unAuthorizedError();
            }
            catch(error){
                expect(error.name).to.equal("unAuthorizedError");
                expect(error.error_message).to.equal(Messages.getMessage("AUTHORIZATION_FAILED"));
                expect(error.httpCode).to.equal("403");
            }


        });

        it("throw Authorization Error must contain httpCode = 401 and custom error message", function() {

            try{
                throw new Errors.unAuthorizedError("this is custom error message");
            }
            catch(error){
                expect(error.name).to.equal("unAuthorizedError");
                expect(error.error_message).to.equal("this is custom error message");
                expect(error.httpCode).to.equal("403");
            }
        });

        it("notFoundError must contain httpCode = 404 and default error message", function() {

            var error = new Errors.notFoundError();
            expect(error.error_message).to.equal(Messages.getMessage("NOT_FOUND"));
            expect(error.httpCode).to.equal("404");

        });

        it("throw notFoundError Error must contain httpCode = 404 and default error message", function() {

            try{
                throw new Errors.notFoundError();
            }
            catch(error){
                expect(error.name).to.equal("notFoundError");
                expect(error.error_message).to.equal(Messages.getMessage("NOT_FOUND"));
                expect(error.httpCode).to.equal("404");
            }


        });

        it("throw notFoundError must contain httpCode = 404 and custom argument", function() {

            try{
                throw new Errors.notFoundError("hello");
            }
            catch(error){
                expect(error.name).to.equal("notFoundError");
                expect(error.error_message).to.equal(Util.format(Messages.getMessage("NOT_FOUND"), "hello"));
                expect(error.httpCode).to.equal("404");
            }
        });

        it("throw notFoundError must contain httpCode = 404 and custom argument", function() {

            try{
                throw new Errors.notFoundError("hello");
            }
            catch(error){
                expect(error.name).to.equal("notFoundError");

                expect(error.error_message).to.equal(Util.format(Messages.getMessage("NOT_FOUND"), "hello"));
                expect(error.httpCode).to.equal("404");
            }
        });

        it("invalidArgument Error must contain httpCode = 400 and default error message", function() {

            var error = new Errors.invalidArgumentsError();
            expect(error.error_message).to.equal(Messages.getMessage("INVALID_ARGS"));
            expect(error.httpCode).to.equal("400");

        });

        it("throw Authentication Error must contain httpCode = 401 and default error message", function() {

            try{
                throw new Errors.invalidArgumentsError();
            }
            catch(error){
                expect(error.name).to.equal("invalidArgumentsError");
                expect(error.error_message).to.equal(Messages.getMessage("INVALID_ARGS"));
                expect(error.httpCode).to.equal("400");
            }
        });

        it("throw Authorization Error must contain httpCode = 401 and custom error message", function() {
            try{
                throw new Errors.invalidArgumentsError("this is custom error message");
            }
            catch(error){
                expect(error.name).to.equal("invalidArgumentsError");
                expect(error.error_message).to.equal("this is custom error message");
                expect(error.httpCode).to.equal("400");
            }
        });

    });



    afterEach(function() {

    });
});
