class Block(object):
  def __init__(self, dictionary):
  '''
    We're looking for index, timestamp, data, prev_hash, nonce
  '''
  for k, v in dictionary.items():
    setattr(self, k, v)
  if not hasattr(self, 'hash'): #in creating the first block, needs to be removed in future
    self.hash = self.create_self_hash()
  def __dict__(self):
    info = {}
    info['index'] = str(self.index)
    info['timestamp'] = str(self.timestamp)
    info['prev_hash'] = str(self.prev_hash)
    info['hash'] = str(self.hash)
    info['data'] = str(self.data)
    return info
  def __str__(self):
    return "Block<prev_hash: %s,hash: %s>" % (self.prev_hash, self.hash)
def create_first_block():
  # index zero and arbitrary previous hash
  block_data = {}
  block_data['index'] = 0
  block_data['timestamp'] = date.datetime.now()
  block_data['data'] = 'First block data'
  block_data['prev_hash'] = None
  block = Block(block_data)
  return block
#check if chaindata folder exists.
chaindata_dir = 'chaindata'
if not os.path.exists(chaindata_dir):
  #make chaindata dir
  os.mkdir(chaindata_dir)
  #check if dir is empty from just creation, or empty before
if os.listdir(chaindata_dir) == []:
  #create first block
  first_block = create_first_block()
  first_block.self_save()
def sync():
  node_blocks = []
  #We're assuming that the folder and at least initial block exists
  chaindata_dir = 'chaindata'
  if os.path.exists(chaindata_dir):
    for filename in os.listdir(chaindata_dir):
      if filename.endswith('.json'): #.DS_Store sometimes screws things up
        filepath = '%s/%s' % (chaindata_dir, filename)
        with open(filepath, 'r') as block_file:
          block_info = json.load(block_file)
          block_object = Block(block_info) #since we can init a Block object with just a dict
          node_blocks.append(block_object)
return node_blocks
