#!/usr/bin/env python
import json
import numpy as np

t = {"plate": [{"id": 1,
                "channels": [
                    {"id": 1,
                     "name": "GFP",
                     "time": ["00:00:00", "00:05:00", "00:10:00", "00:15:00"],
                     "well": ["A01", "A02", "A03", "A04", "A05", "A06",
                              "A07", "A08", "A09", "A10", "A11", "A12",
                              "B01", "B02", "B03", "B04", "B05", "B06",
                              "B07", "B08", "B09", "B10", "B11", "B12",
                              "C01", "C02", "C03", "C04", "C05", "C06",
                              "C07", "C08", "C09", "C10", "C11", "C12",
                              "D01", "D02", "D03", "D04", "D05", "D06",
                              "D07", "D08", "D09", "D10", "D11", "D12",
                              "E01", "E02", "E03", "E04", "E05", "E06",
                              "E07", "E08", "E09", "E10", "E11", "E12",
                              "F01", "F02", "F03", "F04", "F05", "F06",
                              "F07", "F08", "F09", "F10", "F11", "F12",
                              "G01", "G02", "G03", "G04", "G05", "G06",
                              "G07", "G08", "G09", "G10", "G11", "G12",
                              "H01", "H02", "H03", "H04", "H05", "H06",
                              "H07", "H08", "H09", "H10", "H11", "H12"],
                     "value": []}]
                }]
     }

np.random.seed(42)
for i in range(3, 7):
    v = i/2 * np.random.randn(96) + i
    t['plate'][0]['channels'][0]['value'].append(v.tolist())

with open('put_plate.json', 'w') as j:
    json.dump(t, j)
