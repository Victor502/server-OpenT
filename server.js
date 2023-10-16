
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
const { context, propagation} = require('@opentelemetry/api');


const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
console.log('here you go');

sdk.start();


const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());

app.get('/express_backend', (req, res) => {
  const activeContext = propagation.extract(context.active(), req.headers);
  const head = JSON.stringify(req.headers);
  // console.log('head', head);
  console.log('req.headers', req.headers);
  console.log('button clicked');
  console.log('my log');
  console.log('activeContext', activeContext._currentContext);

  res.send({
    express: 'An employee information form contains important details about your employees. Use it to keep track of personal information, duration of employment and other essentials, such as emergency contact information. An employee’s form is also useful if you receive a reference request, need to mail documents to an employee or want to know how long someone has been with your companyEmployee information forms are important in many events. If there’s an urgent need to reach out to them, an employee’s information form will give you more ways to reach them. Furthermore, you can use these forms for emergency contact information if the worker is seriously injured.'
  });
});

