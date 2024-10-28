// index.js
exports = async function(changeEvent) {
    const { operationType } = changeEvent;
    
    if (operationType === 'insert') {
      await UserTrigger.handleInsert(changeEvent);
    }
  };