module.exports = PatternMatcher;

function PatternMatcher (value) {
    this.value = value;
    this.result = value;
    this.resolved = false;

    this.case = function(matcher, callback) {
        if (!this.resolved && matcher(this.value)) {
            this.result = callback(this.value);
            this.resolved = true;
        }
  
        return this;
    };
    
    this.default = function(callback) {
      if (!this.resolved) {
        this.result = callback(this.value);
        this.resolved = true;
      }
  
      return this;
    };

    this.get = function() {
        return this.result;
    }

    return this;
}

PatternMatcher.match = function(value) {
    return new PatternMatcher(value);
};

Object.defineProperty(PatternMatcher, 'type', {
    get: function() {
        return {
            array: function(value) {
                return Array.isArray(value);
            },

            string: function(value) {
                return typeof value === 'string';
            },

            number: function(value) {
                return typeof value === 'number';
            },

            undefined: function(value) {
                return value === undefined;
            },

            null: function(value) {
                return value === null;
            },
            
            instance: function(type) {
                return function(value) {
                    return value instanceof type;
                };
            },

            regex: function(pattern) {
                return function(value) {
                    return pattern.test(value);
                };
            },

            //.... to be continued
        
            custom: function(mather) {
                return function(value) {
                    return mather(value);
                }
            }
        };
     }
});
