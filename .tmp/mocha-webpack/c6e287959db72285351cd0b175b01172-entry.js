
    var testsContext = require.context("../../tests/contracts", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    