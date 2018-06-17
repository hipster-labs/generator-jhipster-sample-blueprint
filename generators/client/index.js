/**
 * Copyright 2013-2017 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const prompts = require('./prompts');
const writeFiles = require('./files').writeFiles;


module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = this.jhipsterContext = this.options.jhipsterContext;

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint generator-jhipster-sample-blueprint')}`);
        }

        this.configOptions = jhContext.configOptions || {};

        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        // any method beginning with _ can be reused from the superclass
        return super._initializing();
    }

    get prompting() {
        return {
            askForClient: prompts.askForClient,
            askForClientSideOpts: prompts.askForClientSideOpts,

            setSharedConfigOptions() {
                this.configOptions.lastQuestion = this.currentQuestion;
                this.configOptions.totalQuestions = this.totalQuestions;
                this.configOptions.clientFramework = this.clientFramework;
                this.configOptions.useSass = this.useSass;
            }
        };
    }

    get configuring() {
        return super._configuring();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return {
            write() {
                writeFiles.call(this);
            }
        };
    }

    get install() {
        return super._install();
    }

    get end() {
        return super._end();
    }
};
