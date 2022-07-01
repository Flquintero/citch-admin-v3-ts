export default (DOMAIN: any, $apiRequest:any) => ({
  getManufacturerSettings: (manufacturerId:any) => {
    return $apiRequest({
      url: `${DOMAIN}/manufacturer`,
      manufacturerId,
    });
  },

  getBulkManufacturerSettings: ({ manufacturerId, body }:any) => {
    return $apiRequest({
      method: 'post',
      url: `${DOMAIN}/vendors/catalogCodes`,
      apiVersion: 'v2',
      manufacturerId,
      data: body.catalogCodes,
    });
  },
});
