const ProcessString = (dataSrting) => {
  function extractValue(key, str) {
    const keyIndex = str.indexOf(key);
    if (keyIndex === -1) return null;

    const startIndex = str.indexOf(":", keyIndex) + 1;
    let endIndex = str.indexOf(",", startIndex);
    if (endIndex === -1) {
      endIndex = str.indexOf("}", startIndex);
    }

    let value = str.substring(startIndex, endIndex).trim();

    // Remove enclosing quotes if they exist
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    return value;
  }
  const senderEmail = extractValue('"SenderEmail"', dataSrting);
  const receiverEmail = extractValue('"ReceiverEmail"', dataSrting);
  const content = extractValue('"Content"', dataSrting);
  const since = extractValue('"Since"', dataSrting);
  const isEncrypt = extractValue('"IsEncrypt"', dataSrting);
  const isFile = extractValue('"IsFile"', dataSrting);

  return {
    SenderEmail: senderEmail,
    ReceiverEmail: receiverEmail,
    Content: content,
    Since: since,
    IsEncrypt: isEncrypt,
    IsFile: isFile,
  };
};

export default ProcessString;
