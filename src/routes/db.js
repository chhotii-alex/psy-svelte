/* All server communication routines here. */

//const urlBase = 'http://127.0.0.1:5000/';
const urlBase = 'https://octopus-app-8dfwr.ondigitalocean.app/';

export async function validateAccessToken(accessTokenLongEnough, accessToken) {
        if (!accessTokenLongEnough) {
           return false;
        }
        accessToken = accessToken.trim();
        const url = `${urlBase}checkToken`;
        const data = { 'access_token' : accessToken };
        const response = await fetch(url, {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
       });
       const j = await response.json();
       if (j['token'] != accessToken) {
          throw new Error("Glitch! Error code: 101");
       }
       return j['isValid'];
}

export async function getSessionId(accessToken) {
       const url = `${urlBase}session`;
       const data = { 'access_token' : accessToken,
            'sequence' : "41324" };
       const response = await fetch(url, {
          method: "POST",
          headers: {
                "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
       });
       const j = await response.json();
       return j;
}

export async function getTrialId(sessionId, blockNumber) {
       const url = `${urlBase}trial`;
       const data = { 'sessionId' : sessionId, 'blockNumber': blockNumber };
       const response = await fetch(url, {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
       });
       const j = await response.json();
       return j;
}

export async function sendKeystrokes(trialId, receiptId, keys) {
    const url = `${urlBase}keys`;
    const data = {
        'trialId' : trialId,
        'receiptId' : receiptId,
        'keys' : keys,
    };
    const response = await fetch(url, {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error("Unsuccessful save request");
    }
    const j = await response.json();
    return j;
}

export async function setTimestamp(sessionId, timestamp) {
    const url = `${urlBase}session/timestamp`;
    const data = {
        'sessionId': sessionId,
        'timeStamp': timestamp
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
             "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error("Unsuccessful request");
    }
}
