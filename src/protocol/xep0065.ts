// ====================================================================
// XEP-0065: SOCKS5 Bytestreams
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0065.html
// Version: 1.8.1 (2015-09-17)
// ====================================================================

import { JID } from '../JID';
import {
    attribute,
    childAttribute,
    childJIDAttribute,
    childText,
    DefinitionOptions,
    integerAttribute,
    JIDAttribute
} from '../jxt';

import { NS_SOCKS5 } from '../Namespaces';

declare module './' {
    export interface IQPayload {
        socks5?: SOCKS5;
    }
}

export interface SOCKS5 {
    mode?: 'tcp' | 'udp';
    address?: string;
    sid: string;
    activate?: string;
    candidateUsed?: JID;
    udpSuccess?: string;
    candidates?: SOCKS5Candidate[];
}

export interface SOCKS5Candidate {
    jid?: JID;
    host?: string;
    port?: number;
    uri?: string;
}

const Protocol: DefinitionOptions[] = [
    {
        element: 'query',
        fields: {
            activate: childText(null, 'activate'),
            address: attribute('dstaddr'),
            candidateUsed: childJIDAttribute(null, 'streamhost-used', 'jid'),
            mode: attribute('mode', 'tcp'),
            sid: attribute('sid'),
            udpSuccess: childAttribute(null, 'udpsuccess', 'dstaddr')
        },
        namespace: NS_SOCKS5,
        path: 'iq.socks5'
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.socks5.candidates'
            }
        ],
        element: 'streamhost',
        fields: {
            host: attribute('host'),
            jid: JIDAttribute('jid'),
            port: integerAttribute('port'),
            uri: attribute('uri')
        },
        namespace: NS_SOCKS5
    }
];
export default Protocol;
