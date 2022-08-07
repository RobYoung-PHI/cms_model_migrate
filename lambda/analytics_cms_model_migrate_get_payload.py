import boto3, json
from boto3.dynamodb.conditions import Key


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')

    try:
        assessid = '_' + str(event['pathParameters']['assessid'])
    except Exception:
        assessid = ''

    userid = str(event['pathParameters']['userid'])
    userassessid = userid + assessid

    table = dynamodb.Table('analytics_cms_check_ids')
    response = table.query(
        IndexName='user_id-index',
        KeyConditionExpression=Key('user_id').eq(userid)
    )
    check_items = response['Items']
    check_items_key = {}

    table = dynamodb.Table('analytics_cms_check_results')
    response = table.query(
        IndexName='user_id-index',
        KeyConditionExpression=Key('user_id').eq(userassessid)
    )
    result_items = response['Items']
    result_items_key = {}

    for check_item in check_items:
        check_item_json = json.loads(json.dumps(check_item))
        check_id = check_item_json['check_id']
        check_items_key[check_id] = check_item_json

    for result_item in result_items:
        result_item_json = json.loads(json.dumps(result_item))
        result_id = result_item_json['check_id']
        result_items_key[result_id] = result_item_json

    return_data = {}
    return_data['Items'] = [{}]
    for key, element in check_items_key.items():
        if key not in result_items_key.keys():
            return_data['Items'].append(check_items_key[key])

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*' },
        'body': json.dumps(return_data)
    }
