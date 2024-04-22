from flask import Flask, request, jsonify
from mech_client.interact import interact, ConfirmationType

app = Flask(__name__)

@app.route('/api/interact', methods=['POST'])
def interact_with_agent():
    data = request.json
    prompt_text = data.get('prompt_text')
    
    try:
        result = interact(
            prompt=prompt_text,
            agent_id=2,
            tool="prediction-online",
            chain_config="celo",
            confirmation_type=ConfirmationType.ON_CHAIN,
            private_key_path='ethereum_private_key.txt'
        )
        
        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
