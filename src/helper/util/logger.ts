import { transports, format } from "winston";

/**
 * @author Med Aziz Guennichi
 * Returns a winston options object with a single file transport.
 * @param scenarioName Name of the test scenario. This is used to create a log file with the same name.
 * @returns A winston options object with a single file transport.
 */
export function options(scenarioName: string) {
  return {
    transports: [
      new transports.File({
        filename: `test-results/logs/${scenarioName}/log.log`,
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
        )
      }),
    ]
  }
};
