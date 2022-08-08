import boto3
from boto3.dynamodb.conditions import Key
import datetime
import json


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    dynamo_table = dynamodb.Table('analytics_cms_check_results')

    try:
        aid = '_' + str(event['aid'])
    except Exception:
        aid = ''

    item = {}
    item_hash = str(event['source_id']) + '_' + str(event['assoc_id']) + '_' + str(event['uid']) + str(aid)
    item['user_id'] = str(event['uid']) + str(aid)
    item['check_id'] = item_hash
    item['assoc_id'] = str(event['assoc_id'])
    item['source_id'] = str(event['source_id'])
    item['status'] = str(event['status'])
    item['updated_at'] = datetime.datetime.now().strftime("%Y-%m-%d"+"T"+"%H:%M:%S.%f"+"Z")
    if len(aid)>0:
        item['assess_id'] = str(event['aid'])
    else:
        item['assess_id'] = str(event['uid'])

    try:
        dynamo_table.put_item(Item=item, ConditionExpression='attribute_not_exists(itemhash)')
        response = 'Success'
    except Exception as e:
        response = 'Failure' + str(e)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*' },
        'body': response
    }
